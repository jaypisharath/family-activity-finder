import { Request, Response, NextFunction } from 'express';
import { ActivityFormData } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateActivityRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors: ValidationError[] = [];
  const { city, kidsAges, timeText, maxMiles, preferences } = req.body;

  // Validate city
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    errors.push({ field: 'city', message: 'City is required' });
  } else if (city.trim().length < 2) {
    errors.push({ field: 'city', message: 'City must be at least 2 characters long' });
  }

  // Validate kids ages
  if (!kidsAges || typeof kidsAges !== 'string' || kidsAges.trim().length === 0) {
    errors.push({ field: 'kidsAges', message: 'Kids ages are required' });
  } else {
    const ages = kidsAges.split(',').map(age => age.trim());
    const validAges = ages.every(age => {
      const numAge = parseInt(age);
      return !isNaN(numAge) && numAge >= 0 && numAge <= 18;
    });
    
    if (!validAges) {
      errors.push({ field: 'kidsAges', message: 'Kids ages must be valid numbers between 0-18' });
    }
  }

  // Validate time text
  if (!timeText || typeof timeText !== 'string' || timeText.trim().length === 0) {
    errors.push({ field: 'timeText', message: 'Time availability is required' });
  }

  // Validate max miles
  if (typeof maxMiles !== 'number' || maxMiles < 1 || maxMiles > 100) {
    errors.push({ field: 'maxMiles', message: 'Max miles must be a number between 1 and 100' });
  }

  // Validate preferences (optional)
  if (preferences && typeof preferences !== 'string') {
    errors.push({ field: 'preferences', message: 'Preferences must be a string' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize the input
  const sanitizedData: ActivityFormData = {
    city: city.trim(),
    kidsAges: kidsAges.trim(),
    timeText: timeText.trim(),
    maxMiles: Math.round(maxMiles),
    preferences: preferences ? preferences.trim() : undefined
  };

  req.body = sanitizedData;
  next();
};

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'Claude API key not configured'
    });
  }
  
  next();
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
