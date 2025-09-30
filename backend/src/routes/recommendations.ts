import { Router, Request, Response } from 'express';
import { ClaudeService } from '../services/claudeService';
import { validateActivityRequest, validateApiKey, asyncHandler } from '../middleware/validation';
import { ActivityFormData } from '../types';

const router = Router();

// Initialize Claude service
const claudeService = new ClaudeService(process.env.ANTHROPIC_API_KEY || '');

// POST /api/recommendations
router.post('/', 
  validateApiKey,
  validateActivityRequest,
  asyncHandler(async (req: Request, res: Response) => {
    const formData: ActivityFormData = req.body;
    
    console.log('Processing recommendation request:', {
      city: formData.city,
      kidsAges: formData.kidsAges,
      timeText: formData.timeText,
      maxMiles: formData.maxMiles,
      hasPreferences: !!formData.preferences,
      timestamp: new Date().toISOString()
    });

    try {
      const recommendations = await claudeService.getActivityRecommendations(formData);
      
      console.log('Successfully generated recommendations:', {
        count: recommendations.length,
        timestamp: new Date().toISOString()
      });

      res.json({
        success: true,
        data: {
          recommendations,
          metadata: {
            city: formData.city,
            kidsAges: formData.kidsAges,
            timeText: formData.timeText,
            maxMiles: formData.maxMiles,
            generatedAt: new Date().toISOString()
          }
        }
      });

    } catch (error) {
      console.error('Error generating recommendations:', error);
      
      // Return a fallback response instead of throwing
      const fallbackRecommendations = [
        {
          title: "**Local Family Fun**",
          emoji: "🎪",
          description: "We're having trouble connecting to our activity database right now. Please try again in a few moments, or check your local community center and parks for family activities.",
          url: "https://example.com",
          distance: "Various",
          ageRange: "All ages",
          timeInfo: "Check local listings"
        },
        {
          title: "**Community Events**",
          emoji: "🏘️",
          description: "Visit your local library, community center, or city website for current family events and activities happening in your area.",
          url: "https://example.com",
          distance: "Local",
          ageRange: "All ages", 
          timeInfo: "Various times"
        }
      ];

      res.status(200).json({
        success: true,
        data: {
          recommendations: fallbackRecommendations,
          metadata: {
            city: formData.city,
            kidsAges: formData.kidsAges,
            timeText: formData.timeText,
            maxMiles: formData.maxMiles,
            generatedAt: new Date().toISOString(),
            fallback: true
          }
        }
      });
    }
  })
);

// GET /api/recommendations/health
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'recommendations-api'
  });
});

export default router;
