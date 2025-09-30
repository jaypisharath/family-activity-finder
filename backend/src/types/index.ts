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
  description: string; // 2-4 sentences
  url: string;
  distance: string; // e.g., "3.2 miles"
  ageRange: string; // e.g., "Ages 4-12"
  timeInfo: string; // e.g., "Open Saturday 10am-5pm"
}

export interface ClaudeResponse {
  recommendations: ActivityRecommendation[];
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface RequestWithUser extends Request {
  user?: {
    ip: string;
    userAgent: string;
  };
}
