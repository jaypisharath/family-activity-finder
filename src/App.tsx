import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityResults from './components/ActivityResults';
import { ActivityFormData, ActivityRecommendation } from './types';
import { simulateApiCall } from './data/dummyData';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState<ActivityRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFormSubmit = async (formData: ActivityFormData) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API call with dummy data
      const results = await simulateApiCall(1500);
      setRecommendations(results);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
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
        <p>Built with React & TypeScript • Milestone 1 Demo</p>
      </footer>
    </div>
  );
}

export default App;
