// Core data types for the Family Activity Finder app

export interface ActivityFormData {
  city: string;
  kidsAges: string; // Comma-separated ages, e.g., "5,8,12"
  timeText: string; // e.g., "Saturday afternoon"
  maxMiles: number; // From slider
  preferences?: string; // Optional text input
}

export interface ActivityRecommendation {
  title: string;
  emoji: string;
  description: string;
  url: string;
  distance: string;
  ageRange: string;
  timeInfo: string;
}

export interface ActivitySearchResponse {
  recommendations: ActivityRecommendation[];
}

// Form validation types
export interface FormErrors {
  city?: string;
  kidsAges?: string;
  timeText?: string;
  maxMiles?: string;
  preferences?: string;
}

// UI state types
export interface AppState {
  formData: ActivityFormData;
  recommendations: ActivityRecommendation[];
  isLoading: boolean;
  errors: FormErrors;
  hasSearched: boolean;
}
