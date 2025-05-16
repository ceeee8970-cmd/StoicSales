import React, { useState, useReducer, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioRecorder from "@/components/ui/audio-recorder";
import { MicrophoneIcon, PlayIcon } from "@/assets/icons";
import { initialState, recorderReducer } from "@/lib/audioRecorder";
import { useToast } from "@/hooks/use-toast";

interface Scenario {
  id: string;
  title: string;
  type: string;
  scenario: string;
}

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
  const { toast } = useToast();
  
  const currentScenario = scenarios[currentScenarioIndex];
  
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
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleViewExamples = () => {
    toast({
      title: "Example Responses",
      description: "In a real implementation, this would open example responses for this scenario.",
    });
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
          Practice handling objections with calm and clarity. Record your response to challenging scenarios.
        </p>
        
        {/* Recording Interface */}
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
        </div>
        
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousScenario}
              disabled={currentScenarioIndex === 0}
            >
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextScenario}
              disabled={currentScenarioIndex === scenarios.length - 1}
            >
              Next
            </Button>
          </div>
          
          <Button onClick={handleViewExamples}>
            View Examples
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SalesCallSimulator;
