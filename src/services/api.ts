import axios from 'axios';
import { ActivityFormData, ActivityRecommendation } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse {
  success: boolean;
  data: {
    recommendations: ActivityRecommendation[];
    metadata: {
      city: string;
      kidsAges: string;
      timeText: string;
      maxMiles: number;
      generatedAt: string;
      fallback?: boolean;
    };
  };
}

export interface ApiError {
  error: {
    message: string;
    code: string;
    timestamp: string;
    path: string;
  };
}

export const getActivityRecommendations = async (
  formData: ActivityFormData
): Promise<ActivityRecommendation[]> => {
  try {
    console.log('Making API request to backend:', formData);
    
    const response = await api.post<ApiResponse>('/api/recommendations', formData);
    
    if (response.data.success) {
      console.log('API response received:', response.data.data);
      return response.data.data.recommendations;
    } else {
      throw new Error('API returned unsuccessful response');
    }
  } catch (error) {
    console.error('API request failed:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const apiError = error.response.data as ApiError;
        throw new Error(apiError.error.message || 'Server error occurred');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
    }
    
    // Generic error fallback
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};
