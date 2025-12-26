# Campus Photo Collector

A Next.js web application for collecting and managing campus photos from multiple universities with AI-powered metadata analysis.

## Features

- **Multi-University Support**: Xidian University (西安电子科技大学), Xi'an Shiyou University (西安石油大学), Xi'an University of Technology (西安理工大学), and University of Bristol (布里斯托大学)
- **Rich Metadata Collection**: Capture photo time, season, weather, location type, and photography style
- **AI-Powered Analysis**: GLM-4.6V-Flash vision model integration for automatic metadata suggestion
- **EXIF Data Extraction**: Automatically extracts GPS coordinates and focal length from photos
- **Drag & Drop Upload**: User-friendly file upload with preview
- **SQLite Database**: Efficient local storage with full metadata tracking

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- GLM API Key (optional, for AI features) - Get one at https://open.bigmodel.cn/usercenter/apikeys

### Installation

1. Clone or navigate to the project directory:
```bash
cd campus-photo-collector
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your GLM API Key
# GLM_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Docker Deployment

Using docker-compose:
```bash
# Set your API key in environment variable or .env file
export GLM_API_KEY="your_api_key_here"

# Start services
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## License

Research and educational purposes.
