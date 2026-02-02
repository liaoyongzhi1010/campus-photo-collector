import { NextRequest, NextResponse } from 'next/server';

// Ollama API 配置
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/chat';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5vl:3b';

interface AnalyzeRequest {
  imageBase64: string;
  language?: string;
}

interface AnalyzeResponse {
  photo_time: string;
  photo_season: string;
  photo_weather: string;
  photo_location: string;
  photo_style: string;
  confidence: number;
  reasoning: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { imageBase64, language = 'zh' } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: language === 'zh' ? '请提供图片' : 'Please provide an image' },
        { status: 400 }
      );
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const promptTemplates = {
      zh: `分析这张校园照片，返回 JSON 格式：
{
  "photo_time": "dawn|morning|noon|afternoon|dusk|night",
  "photo_season": "spring|summer|autumn|winter",
  "photo_weather": "sunny|cloudy|overcast|rainy|snowy",
  "photo_location": "teaching_building|library|gymnasium|playground|canteen|dormitory|gate|square|laboratory|other",
  "photo_style": "landscape|architecture|night|aerial",
  "confidence": 0-100,
  "reasoning": "简要说明判断依据（中文，30-50字）"
}
只返回JSON。`,

      en: `Analyze this campus photo and return JSON format:
{
  "photo_time": "dawn|morning|noon|afternoon|dusk|night",
  "photo_season": "spring|summer|autumn|winter",
  "photo_weather": "sunny|cloudy|overcast|rainy|snowy",
  "photo_location": "teaching_building|library|gymnasium|playground|canteen|dormitory|gate|square|laboratory|other",
  "photo_style": "landscape|architecture|night|aerial",
  "confidence": 0-100,
  "reasoning": "Brief explanation of judgment (English, 30-50 words)"
}
Return only JSON.`
    };

    const prompt = promptTemplates[language as 'zh' | 'en'] || promptTemplates.zh;

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
            images: [base64Data],
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: language === 'zh' ? 'AI 服务暂不可用' : 'AI service is not available' },
        { status: 503 }
      );
    }

    const data = await response.json();

    let aiResponse: AnalyzeResponse;
    try {
      const content = data.message?.content || '';
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      aiResponse = JSON.parse(jsonStr);

      const requiredFields = ['photo_time', 'photo_season', 'photo_weather', 'photo_location', 'photo_style'];
      for (const field of requiredFields) {
        if (!aiResponse[field as keyof AnalyzeResponse]) {
          throw new Error(`Missing field: ${field}`);
        }
      }

      if (typeof aiResponse.confidence !== 'number') {
        aiResponse.confidence = 70;
      }

      if (!aiResponse.reasoning) {
        aiResponse.reasoning = language === 'zh' ? 'AI 自动分析结果' : 'AI auto-analysis result';
      }
    } catch {
      aiResponse = {
        photo_time: 'noon',
        photo_season: 'summer',
        photo_weather: 'sunny',
        photo_location: 'other',
        photo_style: 'landscape',
        confidence: 50,
        reasoning: language === 'zh' ? 'AI 分析结果，请手动确认' : 'AI analysis result, please confirm manually',
      };
    }

    return NextResponse.json(aiResponse);
  } catch {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
