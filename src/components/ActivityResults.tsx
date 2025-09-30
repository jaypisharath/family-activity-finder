import React from 'react';
import { ActivityRecommendation } from '../types';
import './ActivityResults.css';

interface ActivityResultsProps {
  recommendations: ActivityRecommendation[];
  isLoading: boolean;
}

const ActivityResults: React.FC<ActivityResultsProps> = ({ recommendations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="activity-results">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding the perfect activities for your family...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="activity-results">
        <div className="no-results">
          <h3>No activities found</h3>
          <p>Try adjusting your search criteria or expanding your search radius.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-results">
      <div className="results-header">
        <h2>Recommended Activities</h2>
        <p>Here are {recommendations.length} activities perfect for your family!</p>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-header">
              <span className="activity-emoji">{activity.emoji}</span>
              <div className="activity-title">
                <h3 dangerouslySetInnerHTML={{ __html: activity.title }} />
                <div className="activity-meta">
                  <span className="distance">{activity.distance}</span>
                  <span className="age-range">{activity.ageRange}</span>
                </div>
              </div>
            </div>
            
            <div className="activity-content">
              <p className="activity-description">{activity.description}</p>
              
              {activity.timeInfo && (
                <div className="time-info">
                  <span className="time-label">⏰</span>
                  <span>{activity.timeInfo}</span>
                </div>
              )}
              
              <a 
                href={activity.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="activity-link"
              >
                Learn More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityResults;
