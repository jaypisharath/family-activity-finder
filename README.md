# Family Activity Finder

A React application that helps parents find family-friendly activities based on their location, kids' ages, availability, and preferences. Now powered by Claude AI with real-time web search!

## Milestone 1 - UI Foundation ✅

This milestone focused on building a complete user interface with dummy data, demonstrating the full user experience before integrating with the Claude API.

## Milestone 2 - Claude API Integration ✅

This milestone integrates the Claude Messages API with web search to provide real-time, relevant family activity recommendations.

### Features Implemented

#### Milestone 1 Features
- **Responsive Form**: City input, kids' ages, time availability, driving distance slider, and optional preferences
- **Activity Cards**: 5 sample recommendations with bold titles, emojis, and detailed descriptions
- **Loading States**: Simulated API delay with loading spinner
- **Mobile-First Design**: Responsive layout that works on all screen sizes
- **TypeScript**: Full type safety throughout the application
- **Design System**: Consistent colors, typography, and spacing

#### Milestone 2 Features
- **Claude AI Integration**: Real-time activity recommendations using Claude Messages API
- **Web Search**: Current, relevant activity data through Claude's web search tool
- **Express.js Backend**: TypeScript backend with comprehensive error handling
- **API Validation**: Input validation and sanitization
- **Fallback Responses**: Graceful degradation when API calls fail
- **Environment Configuration**: Secure API key management

### Tech Stack

#### Frontend
- **React 18** with TypeScript
- **CSS Modules** for component styling
- **Inter Font** from Google Fonts
- **Create React App** for development tooling
- **Axios** for API communication

#### Backend
- **Express.js** with TypeScript
- **Claude Messages API** (@anthropic-ai/sdk)
- **CORS** for frontend communication
- **Helmet.js** for security
- **Morgan** for request logging

### Getting Started

#### Prerequisites
- Node.js 18+
- Anthropic API key (for Claude API)

#### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```

4. Add your Anthropic API key to `.env`:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:3001`

#### Running Both Services

For full functionality, run both frontend and backend:

1. Terminal 1 (Backend):
   ```bash
   cd backend && npm run dev
   ```

2. Terminal 2 (Frontend):
   ```bash
   npm start
   ```

### Project Structure

```
family-activity-finder/
├── src/                      # Frontend React application
│   ├── components/
│   │   ├── ActivityForm.tsx      # Form component with validation
│   │   ├── ActivityForm.css      # Form styling
│   │   ├── ActivityResults.tsx   # Results display component
│   │   └── ActivityResults.css   # Results styling
│   ├── services/
│   │   └── api.ts               # API service for backend communication
│   ├── data/
│   │   └── dummyData.ts         # Sample activity data (Milestone 1)
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Global application styles
│   └── index.tsx                # Application entry point
├── backend/                  # Express.js backend server
│   ├── src/
│   │   ├── routes/
│   │   │   └── recommendations.ts    # API routes
│   │   ├── services/
│   │   │   └── claudeService.ts      # Claude API integration
│   │   ├── middleware/
│   │   │   ├── validation.ts         # Input validation
│   │   │   └── errorHandler.ts       # Error handling
│   │   ├── types/
│   │   │   └── index.ts              # Backend type definitions
│   │   └── index.ts                  # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

### Design System

- **Primary Color**: #4F46E5 (Indigo)
- **Secondary Color**: #10B981 (Emerald)
- **Accent Color**: #F59E0B (Amber)
- **Background**: #F9FAFB (Gray-50)
- **Typography**: Inter font family

### API Integration

The application now uses the Claude Messages API with web search to provide real-time, relevant activity recommendations. The backend:

- Validates all input data
- Calls Claude API with web search capabilities
- Returns structured JSON responses
- Handles errors gracefully with fallback responses
- Logs all requests for debugging

### Testing the Application

#### With Real API (Milestone 2)

1. Ensure both frontend and backend are running
2. Set up your Anthropic API key in the backend `.env` file
3. Fill out the form with sample data:
   - City: "San Francisco"
   - Kids' Ages: "5, 8"
   - Availability: "Saturday afternoon"
   - Distance: 15 miles
   - Preferences: "outdoor activities"
4. Click "Find Activities" to get real AI-generated recommendations
5. Test with different cities and preferences

#### Fallback Mode

If the API is unavailable, the application will show fallback recommendations and continue to function.

### Environment Variables

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

#### Backend (.env)
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Deployment Notes

- Frontend can be deployed to Vercel, Netlify, or similar
- Backend requires Node.js hosting (Railway, Render, Heroku)
- Ensure environment variables are properly configured
- Consider rate limiting for production use