# Family Activity Finder - Backend

Express.js backend server with Claude API integration for generating family activity recommendations.

## Features

- **Claude API Integration**: Uses Anthropic's Claude Messages API with web search
- **TypeScript**: Full type safety and modern JavaScript features
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Robust error handling with fallback responses
- **CORS Support**: Configured for frontend communication
- **Security**: Helmet.js for security headers
- **Logging**: Morgan for request logging

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
```

3. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Production

Build and start:
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/recommendations

Generate family activity recommendations using Claude AI.

**Request Body:**
```json
{
  "city": "San Francisco",
  "kidsAges": "5,8,12",
  "timeText": "Saturday afternoon",
  "maxMiles": 10,
  "preferences": "outdoor activities"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "title": "**Golden Gate Park**",
        "emoji": "🌳",
        "description": "Perfect for families with kids of all ages...",
        "url": "https://example.com",
        "distance": "2.5 miles",
        "ageRange": "All ages",
        "timeInfo": "Open daily 5am-12am"
      }
    ],
    "metadata": {
      "city": "San Francisco",
      "kidsAges": "5,8,12",
      "timeText": "Saturday afternoon",
      "maxMiles": 10,
      "generatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "family-activity-finder-backend",
  "version": "1.0.0"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Architecture

### Services

- **ClaudeService**: Handles Claude API communication and response parsing
- **Validation Middleware**: Input validation and sanitization
- **Error Handler**: Centralized error handling and logging

### Key Features

1. **Web Search Integration**: Uses Claude's web search tool for current activity data
2. **Fallback Responses**: Graceful degradation when API calls fail
3. **Request Validation**: Comprehensive input validation
4. **Type Safety**: Full TypeScript implementation
5. **Security**: Helmet.js security headers and CORS configuration

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 status with detailed field errors
- **API Errors**: Graceful fallback responses
- **Server Errors**: 500 status with error logging
- **Timeout Handling**: 30-second request timeout

## Development Notes

- Uses Claude 3.5 Sonnet model for best performance
- Implements web search for current, relevant activity data
- Includes rate limiting considerations for production
- Logs all requests and errors for debugging
