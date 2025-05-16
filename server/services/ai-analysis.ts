import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface AIFeedback {
  summary: string;
  strengths: string[];
  improvements: string[];
  stoicPrinciples: {
    principle: string;
    application: string;
  }[];
  score: number;
}

export async function analyzeSalesResponse(
  scenario: string,
  audioTranscript: string
): Promise<AIFeedback> {
  try {
    console.log('Analyzing sales response with Claude...');
    
    const prompt = `
    As a Stoic Sales Coach, analyze this sales call scenario and response. 
    
    SCENARIO: "${scenario}"
    
    SALES PROFESSIONAL'S RESPONSE: "${audioTranscript}"
    
    Evaluate how well the response embodies Stoic principles in a sales context.
    
    Provide a comprehensive analysis including:
    1. A brief overall assessment (2-3 sentences)
    2. 2-3 specific strengths of the response
    3. 2-3 areas for improvement
    4. Identify 1-2 Stoic principles most relevant to this scenario and how they could be better applied
    5. A Stoic Sales Score from 1-10 (10 being perfect Stoic sales mastery)
    
    Format your response as a JSON object with these fields:
    {
      "summary": "string - overall assessment",
      "strengths": ["string array - key strengths"],
      "improvements": ["string array - improvement areas"],
      "stoicPrinciples": [{"principle": "string - name of principle", "application": "string - how to apply it"}],
      "score": number - 1-10 score
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract the JSON from the response
    const jsonString = response.content[0].text;
    const feedback = JSON.parse(jsonString) as AIFeedback;
    
    return feedback;
  } catch (error) {
    console.error('Error during AI analysis:', error);
    // Return a fallback response in case of error
    return {
      summary: "We couldn't analyze your response due to a technical error. Please try again later.",
      strengths: [],
      improvements: [],
      stoicPrinciples: [],
      score: 0
    };
  }
}

// Simple mock transcription service - in a real app, you would use a proper speech-to-text service
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  // This is a mock implementation
  // In a real app, you would send the audio to a transcription service
  
  console.log('Mock transcribing audio of size:', audioBuffer.length);
  
  // For demo purposes, return placeholder text
  return "I understand your concern about the price. Let me ask you - what specific value are you looking for that would justify the investment? I want to make sure we're focusing on what matters most to you, rather than just the number itself. If we can align on value, we can discuss whether our solution truly delivers what you need.";
}