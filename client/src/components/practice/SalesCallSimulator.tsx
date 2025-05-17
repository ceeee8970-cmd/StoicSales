import React, { useState, useReducer, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioRecorder from "@/components/ui/audio-recorder";
import { MicrophoneIcon, PlayIcon, CheckCircleIcon } from "@/assets/icons";
import { initialState, recorderReducer } from "@/lib/audioRecorder";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Scenario {
  id: string;
  title: string;
  type: string;
  scenario: string;
}

interface ExampleResponse {
  quality: "poor" | "good" | "excellent";
  text: string;
  explanation: string;
}

// Example responses for each scenario
const exampleResponses = {
  "1": [
    {
      quality: "poor",
      text: "Look, our price is our price for a reason. We offer premium features that those cheaper solutions just can't match. I can maybe knock off 5% but that's really the best I can do. You're getting what you pay for here.",
      explanation: "This response is defensive and combative. It immediately frames the discussion as adversarial and focuses solely on justifying the price rather than understanding the client's concerns."
    },
    {
      quality: "good",
      text: "I understand your concern about the price point. Many clients initially feel the same way. Can you help me understand which aspects of our solution are most valuable to you? That way, I might be able to suggest a configuration that better aligns with your budget while still addressing your core needs.",
      explanation: "This response acknowledges the concern with empathy and shifts toward understanding the client's priorities. It's solution-oriented and opens a collaborative discussion."
    },
    {
      quality: "excellent",
      text: "I appreciate your honesty about the price. That's valuable feedback. If you don't mind, I'd like to take a step back and focus on the outcomes you're hoping to achieve. Our solution represents an investment, and I want to ensure we're addressing the right challenges for your business. Could you share which specific problems you're most urgently trying to solve? This will help me determine if there's a way to deliver the value you need within your investment parameters.",
      explanation: "This response embodies Stoic principles by focusing on what can be controlled (understanding needs) rather than dwelling on price. It demonstrates genuine curiosity, reframes the conversation around value/outcomes, and treats objection as an opportunity for deeper understanding."
    }
  ],
  "2": [
    {
      quality: "poor",
      text: "Oh, so you're putting me off. I was hoping to close this deal today. Our promotion ends this week, so you'll miss out on the discount if you wait too long. Can I at least get a verbal commitment from you?",
      explanation: "This response shows impatience and self-interest, using pressure tactics and creating artificial urgency. It disrespects the client's need for careful consideration."
    },
    {
      quality: "good",
      text: "I understand you need time to discuss with your team. That's a smart approach for an important decision. Would it help if I provided some additional materials that address common questions teams typically have? Also, what timeline works best for reconnecting?",
      explanation: "This response respects the client's process while offering helpful resources. It accepts the timeline while gently moving toward next steps."
    },
    {
      quality: "excellent",
      text: "I completely understand the need to discuss this with your team - that's a prudent approach for a decision of this magnitude. To help make that conversation more productive, may I ask what specific aspects you think your team will want to evaluate most carefully? I'd be happy to provide targeted information that addresses those points specifically, rather than overwhelming everyone with general materials. And of course, I'm available if any questions arise during your discussions.",
      explanation: "This response fully embraces the Stoic principle of focusing on what you can control. It shows genuine respect for the client's process, demonstrates patience, and offers valuable assistance that makes their internal discussion more productive."
    }
  ],
  "3": [
    {
      quality: "poor",
      text: "I understand, but our solution is priced that way because it's superior to cheaper alternatives. Maybe you could find room in next quarter's budget? Or we could split the payments over time if that helps.",
      explanation: "This response dismisses the budget concern without exploring it and immediately jumps to pushy payment solutions that don't address the fundamental value question."
    },
    {
      quality: "good",
      text: "I appreciate you being straightforward about your budget constraints. We do have different tiers of service that might better align with your current situation. Could you share what range would work for you? That would help me identify if we have options that could meet your needs now.",
      explanation: "This response acknowledges the constraint and offers practical alternatives, showing flexibility and a desire to find a workable solution."
    },
    {
      quality: "excellent",
      text: "Thank you for being candid about your budget considerations - that's very helpful. Budget constraints are a reality all businesses face, and I respect that. What I'd like to understand is which specific outcomes are most critical for you right now? Our solution has several components, and sometimes we can create a phased approach that addresses your most urgent needs first, while creating a roadmap for adding capabilities as your situation evolves. This way, we can respect your current budget while still building toward your longer-term goals.",
      explanation: "This response embodies Stoic wisdom by accepting reality without frustration and focusing on creative solutions. It demonstrates deep respect for the client's constraints while suggesting a thoughtful, customized approach that aligns with both current limitations and future aspirations."
    }
  ],
  "4": [
    {
      quality: "poor",
      text: "Our competitor's solution seems cheaper because it's inferior. They cut corners on critical features and their support is terrible. You'll regret going with them when things break down and no one answers your calls.",
      explanation: "This response attacks the competitor unprofessionally and makes unsubstantiated claims. It comes across as desperate and doesn't focus on the unique value proposition."
    },
    {
      quality: "good",
      text: "I understand you're evaluating multiple options, which is a smart approach. While our solution may have a different price point, we've invested heavily in reliability, security, and responsive support. Our clients typically find that the total cost of ownership is actually lower due to fewer issues and faster resolution times.",
      explanation: "This response avoids disparaging competitors while clearly articulating value differentiators. It respects the comparison process and offers substantive reasons for the price difference."
    },
    {
      quality: "excellent",
      text: "I appreciate your transparency about exploring multiple options - that's exactly what a diligent decision-maker should do. Price is certainly one factor to consider, and I respect that. I'm curious - beyond price, what criteria are most important in your evaluation? Different solutions often have different strengths, and understanding your priorities would help me clarify whether our approach aligns with what matters most to your business. Many of our clients initially considered alternatives but ultimately chose us because of specific aspects like [relevant differentiator]. But the right choice really depends on your unique situation and priorities.",
      explanation: "This response exemplifies Stoic principles by remaining calm and focused amid competitive pressure. It shows genuine curiosity about the client's decision-making criteria rather than reacting defensively. It respects the comparative process, gently educates about differentiators, and demonstrates confidence without arrogance."
    }
  ]
};

const scenarios: Scenario[] = [
  {
    id: "1",
    title: "Scenario #1",
    type: "Price objection",
    scenario: "I appreciate the presentation, but honestly, your solution is priced way above what we were expecting to invest. Can you do better on the price?"
  },
  {
    id: "2",
    title: "Scenario #2",
    type: "Need more time",
    scenario: "This all sounds interesting, but I need to think about it and discuss with my team. Can we reconnect in a few weeks?"
  },
  {
    id: "3",
    title: "Scenario #3",
    type: "Budget objection",
    scenario: "I like what you're offering, but honestly, it's just outside our budget right now. We need to go with something more affordable."
  },
  {
    id: "4",
    title: "Scenario #4",
    type: "Competitor comparison",
    scenario: "We're already talking to your competitor and their solution seems pretty similar but at a lower price point. Why should we go with you?"
  }
];

const SalesCallSimulator: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [recorderState, recorderDispatch] = useReducer(recorderReducer, initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const { toast } = useToast();
  
  const currentScenario = scenarios[currentScenarioIndex];
  const scenarioExamples = exampleResponses[currentScenario.id as keyof typeof exampleResponses] || [];
  
  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      resetRecording();
    }
  };
  
  const handlePreviousScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      resetRecording();
    }
  };
  
  const resetRecording = () => {
    recorderDispatch({ type: "RESET_RECORDER" });
    setIsPlaying(false);
    setShowExamples(false);
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const viewExampleResponses = () => {
    if (!recorderState.audio) {
      toast({
        title: "Record your response first",
        description: "Practice responding to the scenario before viewing examples.",
        variant: "destructive"
      });
      return;
    }
    
    setShowExamples(true);
  };
  
  // Handle audio playback
  useEffect(() => {
    let audioElement: HTMLAudioElement | null = null;
    
    if (recorderState.audio) {
      audioElement = new Audio(recorderState.audio);
      
      if (isPlaying) {
        audioElement.play();
        audioElement.onended = () => setIsPlaying(false);
      } else if (audioElement) {
        audioElement.pause();
      }
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.onended = null;
      }
    };
  }, [isPlaying, recorderState.audio]);
  
  // Colors for quality badges
  const qualityColors: Record<string, string> = {
    poor: "bg-red-100 text-red-800",
    good: "bg-amber-100 text-amber-800",
    excellent: "bg-emerald-100 text-emerald-800"
  };
  
  return (
    <Card className="practice-card bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-light">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading text-lg font-bold">Sales Call Simulator</h3>
          <div className="bg-primary-light bg-opacity-10 text-primary rounded-full px-3 py-1 text-xs font-medium">
            Practice
          </div>
        </div>
        
        <p className="text-neutral-medium text-sm mb-5">
          Practice handling objections with calm and clarity. Record a concise 30-second response to challenging scenarios and compare with example responses.
        </p>
        
        {!showExamples ? (
          /* Recording Interface */
          <div className="bg-neutral-lightest rounded-lg p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  <MicrophoneIcon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{currentScenario.title}</h4>
                  <p className="text-xs text-neutral-medium">{currentScenario.type}</p>
                </div>
              </div>
              
              {recorderState.audio && (
                <button 
                  className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pause recording" : "Play recording"}
                >
                  <PlayIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <p className="text-sm mb-4 bg-white p-3 rounded-lg border border-neutral-light italic">
              "{currentScenario.scenario}"
            </p>
            
            <AudioRecorder 
              recorderState={recorderState}
              recorderDispatch={recorderDispatch}
            />
            
            {recorderState.audio && (
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={viewExampleResponses}
                  className="w-full md:w-auto"
                >
                  View Example Responses
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Example Responses Interface */
          <div className="bg-neutral-lightest rounded-lg p-5 mb-5">
            <div className="space-y-5">
              <div className="bg-white p-4 rounded-lg border border-neutral-light">
                <h4 className="font-heading font-bold mb-3">Your Recording</h4>
                <p className="text-sm text-neutral-medium mb-2">
                  Listen to your response and compare it with the examples below to self-assess your approach.
                </p>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlayback}
                    className="flex items-center"
                  >
                    <PlayIcon className="h-4 w-4 mr-2" />
                    {isPlaying ? "Pause" : "Play"} Your Response
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-light">
                <h4 className="font-heading font-bold mb-3">Example Responses</h4>
                <p className="text-sm text-neutral-medium mb-4">
                  Compare your approach with these examples to identify areas for improvement in handling this scenario.
                </p>
                
                <Tabs defaultValue="poor">
                  <TabsList className="mb-4">
                    <TabsTrigger value="poor">Needs Improvement</TabsTrigger>
                    <TabsTrigger value="good">Effective</TabsTrigger>
                    <TabsTrigger value="excellent">Excellent</TabsTrigger>
                  </TabsList>
                  
                  {scenarioExamples.map((example) => (
                    <TabsContent key={example.quality} value={example.quality} className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Badge className={qualityColors[example.quality as keyof typeof qualityColors]}>
                            {example.quality === "poor" ? "Needs Improvement" : 
                             example.quality === "good" ? "Effective" : "Excellent"}
                          </Badge>
                        </div>
                        <p className="text-sm bg-neutral-50 p-3 rounded-lg border border-neutral-light mb-3 italic">
                          "{example.text}"
                        </p>
                        <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-light">
                          <h5 className="text-sm font-medium mb-1">Analysis:</h5>
                          <p className="text-sm text-neutral-medium">
                            {example.explanation}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={resetRecording} 
                className="w-full"
              >
                Practice Again
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousScenario}
              disabled={currentScenarioIndex === 0 || showExamples}
            >
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextScenario}
              disabled={currentScenarioIndex === scenarios.length - 1 || showExamples}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SalesCallSimulator;
