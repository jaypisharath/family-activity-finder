# Family Activity Finder

A React application that helps parents find family-friendly activities based on their location, kids' ages, availability, and preferences.

## Milestone 1 - UI Foundation ✅

This milestone focuses on building a complete user interface with dummy data, demonstrating the full user experience before integrating with the Claude API.

### Features Implemented

- **Responsive Form**: City input, kids' ages, time availability, driving distance slider, and optional preferences
- **Activity Cards**: 5 sample recommendations with bold titles, emojis, and detailed descriptions
- **Loading States**: Simulated API delay with loading spinner
- **Mobile-First Design**: Responsive layout that works on all screen sizes
- **TypeScript**: Full type safety throughout the application
- **Design System**: Consistent colors, typography, and spacing

### Tech Stack

- **React 18** with TypeScript
- **CSS Modules** for component styling
- **Inter Font** from Google Fonts
- **Create React App** for development tooling

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project Structure

```
src/
├── components/
│   ├── ActivityForm.tsx      # Form component with validation
│   ├── ActivityForm.css      # Form styling
│   ├── ActivityResults.tsx   # Results display component
│   └── ActivityResults.css   # Results styling
├── data/
│   └── dummyData.ts          # Sample activity data
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
├── App.css                   # Global application styles
└── index.tsx                 # Application entry point
```

### Design System

- **Primary Color**: #4F46E5 (Indigo)
- **Secondary Color**: #10B981 (Emerald)
- **Accent Color**: #F59E0B (Amber)
- **Background**: #F9FAFB (Gray-50)
- **Typography**: Inter font family

### Next Steps (Milestone 2)

- Integrate Claude API with web search
- Replace dummy data with real activity recommendations
- Add error handling for API failures
- Implement environment configuration

### Testing the Application

1. Fill out the form with sample data:
   - City: "San Francisco"
   - Kids' Ages: "5, 8"
   - Availability: "Saturday afternoon"
   - Distance: 15 miles
   - Preferences: "outdoor activities"

2. Click "Find Activities" to see the loading state and results

3. Test responsive design by resizing the browser window

The application demonstrates the complete user flow with realistic dummy data, providing a solid foundation for the Claude API integration in Milestone 2.