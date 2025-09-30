import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityResults from './components/ActivityResults';
import { ActivityFormData, ActivityRecommendation } from './types';
import { getActivityRecommendations } from './services/api';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState<ActivityRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFormSubmit = async (formData: ActivityFormData) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Call real API endpoint
      const results = await getActivityRecommendations(formData);
      setRecommendations(results);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Set empty array on error - the API service handles fallback responses
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🎯 Family Activity Finder</h1>
          <p>Discover amazing activities for your family</p>
        </div>
      </header>
      
      <main className="app-main">
        <ActivityForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        
        {hasSearched && (
          <ActivityResults 
            recommendations={recommendations} 
            isLoading={isLoading} 
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Built with React & TypeScript • Powered by Claude AI</p>
      </footer>
    </div>
  );
}

export default App;
