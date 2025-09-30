import Anthropic from '@anthropic-ai/sdk';
import { ActivityFormData, ActivityRecommendation, ClaudeResponse } from '../types';

export class ClaudeService {
  private anthropic: Anthropic;

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({
      apiKey: apiKey,
    });
  }

  async getActivityRecommendations(formData: ActivityFormData): Promise<ActivityRecommendation[]> {
    try {
      const prompt = this.buildPrompt(formData);
      
      const message = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.7,
        system: `You are a helpful assistant that finds family-friendly activities. Use the web search tool to find current, relevant activities in the specified location. Always return exactly 5 recommendations in the specified JSON format.`,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        tools: [
          {
            name: 'web_search',
            description: 'Search the web for current information about activities, events, and places',
            input_schema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query to find relevant activities'
                }
              },
              required: ['query']
            }
          }
        ]
      });

      // Process the response and extract recommendations
      const response = this.parseClaudeResponse(message);
      return response.recommendations;

    } catch (error) {
      console.error('Claude API Error:', error);
      throw new Error('Failed to get activity recommendations from Claude API');
    }
  }

  private buildPrompt(formData: ActivityFormData): string {
    return `
Find 5 family-friendly activities in ${formData.city} for kids aged ${formData.kidsAges} years old.

Requirements:
- Available during: ${formData.timeText}
- Within ${formData.maxMiles} miles of ${formData.city}
- ${formData.preferences ? `Additional preferences: ${formData.preferences}` : ''}

Use web search to find current, relevant activities. For each activity, provide:
- A bold title (use **title** format)
- An appropriate emoji
- 2-4 sentence description explaining why it's perfect for the family
- A relevant URL
- Distance from the city
- Age range suitability
- Time availability information

Return the results in this exact JSON format:
{
  "recommendations": [
    {
      "title": "**Activity Name**",
      "emoji": "🎯",
      "description": "2-4 sentences describing the activity, why it's perfect for the family's ages and interests, what makes it special, and practical details like timing or location highlights.",
      "url": "https://example.com/activity-link",
      "distance": "X.X miles",
      "ageRange": "Ages X-X",
      "timeInfo": "Available [time details]"
    }
  ]
}

Search for current activities, events, and places that match these criteria.`;
  }

  private parseClaudeResponse(message: any): ClaudeResponse {
    try {
      // Extract text content from the message
      const content = message.content[0];
      if (content.type === 'text') {
        const text = content.text;
        
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const parsed = JSON.parse(jsonStr);
          
          // Validate the response structure
          if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
            return parsed as ClaudeResponse;
          }
        }
      }
      
      // Fallback: create a structured response from text
      return this.createFallbackResponse(message);
      
    } catch (error) {
      console.error('Error parsing Claude response:', error);
      return this.createFallbackResponse(message);
    }
  }

  private createFallbackResponse(message: any): ClaudeResponse {
    // Create a fallback response if JSON parsing fails
    return {
      recommendations: [
        {
          title: "**Local Family Activity**",
          emoji: "🎉",
          description: "We found some great family activities in your area! Please try your search again for more specific recommendations.",
          url: "https://example.com",
          distance: "Various",
          ageRange: "All ages",
          timeInfo: "Check availability"
        }
      ]
    };
  }
}
