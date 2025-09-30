// Core data types for the Family Activity Finder app

export interface ActivityFormData {
  city: string;
  kidsAges: number[];
  availability: string;
  maxDistance: number;
  preferences?: string;
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
  availability?: string;
  maxDistance?: string;
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
