import React, { useState } from 'react';
import { ActivityFormData, FormErrors } from '../types';
import './ActivityForm.css';

interface ActivityFormProps {
  onSubmit: (formData: ActivityFormData) => void;
  isLoading: boolean;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    city: '',
    kidsAges: [],
    availability: '',
    maxDistance: 15,
    preferences: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validation function - this is where we ensure data quality
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (formData.kidsAges.length === 0) {
      newErrors.kidsAges = 'Please enter at least one child\'s age';
    }

    if (!formData.availability.trim()) {
      newErrors.availability = 'Please select when you\'re available';
    }

    if (formData.maxDistance < 1 || formData.maxDistance > 50) {
      newErrors.maxDistance = 'Distance must be between 1 and 50 miles';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleAgeInput = (value: string) => {
    // Parse comma-separated ages and convert to numbers
    const ages = value
      .split(',')
      .map(age => parseInt(age.trim()))
      .filter(age => !isNaN(age) && age > 0 && age < 18);
    
    setFormData(prev => ({ ...prev, kidsAges: ages }));
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Find Family Activities</h2>
        <p>Tell us about your family and we'll find the perfect activities!</p>
      </div>

      <div className="form-group">
        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
          placeholder="e.g., San Francisco, CA"
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="kidsAges">Kids' Ages *</label>
        <input
          type="text"
          id="kidsAges"
          value={formData.kidsAges.join(', ')}
          onChange={(e) => handleAgeInput(e.target.value)}
          placeholder="e.g., 5, 8, 12"
          className={errors.kidsAges ? 'error' : ''}
        />
        {errors.kidsAges && <span className="error-message">{errors.kidsAges}</span>}
        <small>Enter ages separated by commas</small>
      </div>

      <div className="form-group">
        <label htmlFor="availability">When are you free? *</label>
        <select
          id="availability"
          value={formData.availability}
          onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
          className={errors.availability ? 'error' : ''}
        >
          <option value="">Select a time</option>
          <option value="Saturday morning">Saturday morning</option>
          <option value="Saturday afternoon">Saturday afternoon</option>
          <option value="Saturday evening">Saturday evening</option>
          <option value="Sunday morning">Sunday morning</option>
          <option value="Sunday afternoon">Sunday afternoon</option>
          <option value="Sunday evening">Sunday evening</option>
          <option value="This weekend">This weekend</option>
          <option value="Next weekend">Next weekend</option>
        </select>
        {errors.availability && <span className="error-message">{errors.availability}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="maxDistance">
          How far will you drive? ({formData.maxDistance} miles)
        </label>
        <input
          type="range"
          id="maxDistance"
          min="1"
          max="50"
          value={formData.maxDistance}
          onChange={(e) => setFormData(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
          className="slider"
        />
        <div className="slider-labels">
          <span>1 mile</span>
          <span>50 miles</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="preferences">Other Preferences (optional)</label>
        <input
          type="text"
          id="preferences"
          value={formData.preferences}
          onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
          placeholder="e.g., outdoor activities, educational, free events"
        />
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Finding Activities...' : 'Find Activities'}
      </button>
    </form>
  );
};

export default ActivityForm;
