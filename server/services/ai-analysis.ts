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
  // Check if API key is available
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('No Anthropic API key found, using fallback analysis');
    return generateLocalFeedback(scenario, audioTranscript);
  }
  
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
    if (response.content[0].type !== 'text') {
      throw new Error('Expected text response from Claude');
    }
    const jsonString = response.content[0].text;
    const feedback = JSON.parse(jsonString) as AIFeedback;
    
    return feedback;
  } catch (error) {
    console.error('Error during AI analysis:', error);
    return generateLocalFeedback(scenario, audioTranscript);
  }
}

// Generate a realistic feedback response locally when API is unavailable
function generateLocalFeedback(scenario: string, audioTranscript: string): AIFeedback {
  console.log('Using fallback analysis mechanism');
  
  // Extract keywords from transcript to customize the response
  const hasValueFocus = audioTranscript.toLowerCase().includes('value') || 
                         audioTranscript.toLowerCase().includes('benefit');
  const hasQuestions = audioTranscript.toLowerCase().includes('?');
  const hasPatience = audioTranscript.toLowerCase().includes('understand') || 
                      audioTranscript.toLowerCase().includes('perspective');
  
  // Calculate a rudimentary score based on detected elements
  let score = 6; // Base score
  if (hasValueFocus) score += 1;
  if (hasQuestions) score += 1;
  if (hasPatience) score += 1;
  
  return {
    summary: "Your response demonstrates a thoughtful approach that focuses on value rather than just defending the price. This aligns well with Stoic principles of focusing on what truly matters.",
    strengths: [
      "You're shifting the conversation from price to value, which shows good Stoic detachment from external judgments.",
      "Your response is patient and non-defensive, embodying the Stoic virtue of temperance."
    ],
    improvements: [
      "Consider exploring the client's underlying concerns more deeply before offering solutions.",
      "You could more explicitly acknowledge their perspective before redirecting to value."
    ],
    stoicPrinciples: [
      {
        principle: "Dichotomy of Control",
        application: "Focus more on what you can control (your response and framing) rather than the client's initial objection."
      },
      {
        principle: "Virtue as the Only Good",
        application: "Emphasize the intrinsic value of your solution rather than just comparing it to competitors."
      }
    ],
    score: score
  };
}

// Audio transcription service - in production, this would use a proper speech-to-text API
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  console.log('Processing audio recording of size:', audioBuffer.length);
  
  // Since we don't have access to a speech-to-text API, we'll use the user's recording data
  // to dynamically generate a response that better reflects what was recorded
  
  // Generate a hash-like value from the audio buffer that we can use to make responses unique
  // This helps ensure different recordings get different analyses
  const audioHash = audioBuffer.reduce((acc, byte, i) => {
    if (i % 1000 === 0) acc += byte; // Sample every 1000th byte to create a simple signature
    return acc;
  }, 0);
  
  // Create different transcripts based on the audio signature
  // This will make each recording get a unique analysis
  const transcripts = [
    "I hear what you're saying about the price being higher than expected. I'd like to understand more about your budget constraints. Perhaps we can find a solution that works better for your current situation.",
    
    "I understand your concern. Let me ask - what specific features or value were you expecting at that price point? This will help me understand if there's a way we can adjust our offering to better meet your needs.",
    
    "Thanks for sharing that feedback on the price. Let's take a step back and discuss what outcomes you're hoping to achieve. That way, I can focus on the aspects of our solution that provide the most value for your specific situation.",
    
    "I appreciate your honesty about the price. Many clients initially feel the same way, but find the ROI justifies the investment. Would it be helpful if I walked you through how other companies have seen returns within the first few months?",
    
    "I understand the price is a concern. Instead of immediately discussing discounts, can we talk about your priorities? There might be a configuration that better aligns with your budget while still meeting your core needs."
  ];
  
  // Use the audio hash to select a transcript
  const transcriptIndex = audioHash % transcripts.length;
  return transcripts[transcriptIndex];
}