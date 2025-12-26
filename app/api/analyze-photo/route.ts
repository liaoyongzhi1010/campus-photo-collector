import { NextRequest, NextResponse } from 'next/server';

// GLM-4.6V-Flash API 配置
const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const GLM_API_KEY = process.env.GLM_API_KEY;

// 元数据选项的中文映射
const METADATA_OPTIONS = {
  photo_time: {
    dawn: '黎明',
    morning: '早晨',
    noon: '中午',
    afternoon: '下午',
    dusk: '黄昏',
    night: '夜晚'
  },
  photo_season: {
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季'
  },
  photo_weather: {
    sunny: '晴天',
    cloudy: '多云',
    overcast: '阴天',
    rainy: '雨天',
    snowy: '雪天'
  },
  photo_location: {
    teaching_building: '教学楼',
    library: '图书馆',
    gymnasium: '体育馆',
    playground: '操场',
    canteen: '食堂',
    dormitory: '宿舍',
    gate: '校门',
    square: '广场',
    laboratory: '实验室',
    other: '其他'
  },
  photo_style: {
    landscape: '风景',
    architecture: '建筑',
    night: '夜景',
    aerial: '航拍'
  }
};

interface AnalyzeRequest {
  imageBase64: string;
  language?: string; // 添加语言参数
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
    // 检查 API Key
    if (!GLM_API_KEY) {
      return NextResponse.json(
        { error: 'GLM API Key 未配置，请在 .env 文件中设置 GLM_API_KEY' },
        { status: 500 }
      );
    }

    const body: AnalyzeRequest = await request.json();
    const { imageBase64, language = 'zh' } = body; // 默认中文

    if (!imageBase64) {
      return NextResponse.json(
        { error: '请提供图片' },
        { status: 400 }
      );
    }

    // 根据语言构建不同的提示词
    const promptTemplates = {
      zh: `你是一个专业的校园照片分析助手。请仔细分析这张校园照片，并根据图片内容自动识别并推荐元数据。

请分析以下信息：
1. 拍摄时间（根据光线判断）
2. 季节（根据植被、天气等判断）
3. 天气情况
4. 地点类型（校园场景）
5. 照片风格

请以 JSON 格式回复，包含以下字段：
{
  "photo_time": "选择一个",  // 可选: dawn, morning, noon, afternoon, dusk, night
  "photo_season": "选择一个",  // 可选: spring, summer, autumn, winter
  "photo_weather": "选择一个",  // 可选: sunny, cloudy, overcast, rainy, snowy
  "photo_location": "选择一个",  // 可选: teaching_building, library, gymnasium, playground, canteen, dormitory, gate, square, laboratory, other
  "photo_style": "选择一个",  // 可选: landscape, architecture, night, aerial
  "confidence": 0-100,  // 整体判断的置信度（百分比）
  "reasoning": "详细说明判断依据，包括：光线特征、天气状况、植被状态、建筑特点、场景细节等，50-100字"
}

注意：
- 必须填写所有字段，使用英文 key 值
- 如果某些信息难以判断，选择最接近的选项
- reasoning 必须用中文详细说明，要包含具体的观察细节和判断逻辑，字数在50-100字之间
- 只返回 JSON，不要其他内容`,

      en: `You are a professional campus photo analysis assistant. Please carefully analyze this campus photo and automatically identify and recommend metadata based on the image content.

Please analyze the following information:
1. Time of day (based on lighting)
2. Season (based on vegetation, weather, etc.)
3. Weather conditions
4. Location type (campus scene)
5. Photo style

Please reply in JSON format with the following fields:
{
  "photo_time": "choose one",  // Options: dawn, morning, noon, afternoon, dusk, night
  "photo_season": "choose one",  // Options: spring, summer, autumn, winter
  "photo_weather": "choose one",  // Options: sunny, cloudy, overcast, rainy, snowy
  "photo_location": "choose one",  // Options: teaching_building, library, gymnasium, playground, canteen, dormitory, gate, square, laboratory, other
  "photo_style": "choose one",  // Options: landscape, architecture, night, aerial
  "confidence": 0-100,  // Overall confidence percentage
  "reasoning": "Detailed explanation of your judgment, including: lighting characteristics, weather conditions, vegetation state, architectural features, scene details, etc., 50-100 words"
}

Note:
- All fields must be filled, use English key values
- If some information is difficult to determine, choose the closest option
- reasoning MUST be in English with detailed explanation including specific observations and reasoning logic, 50-100 words
- Only return JSON, no other content`
    };

    const prompt = promptTemplates[language as 'zh' | 'en'] || promptTemplates.zh;

    // 调用 GLM-4.6V-Flash API
    const response = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:')
                    ? imageBase64
                    : `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GLM API Error:', errorData);
      return NextResponse.json(
        { error: `GLM API 调用失败: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 解析 AI 响应
    let aiResponse: AnalyzeResponse;
    try {
      const content = data.choices[0].message.content;
      // 尝试提取 JSON（可能包含在 markdown 代码块中）
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      aiResponse = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('解析 AI 响应失败:', parseError);
      return NextResponse.json(
        { error: 'AI 响应格式错误，请重试' },
        { status: 500 }
      );
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('分析图片时出错:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
      { status: 500 }
    );
  }
}
