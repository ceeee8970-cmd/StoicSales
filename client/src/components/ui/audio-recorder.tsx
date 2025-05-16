import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MicrophoneIcon, StopIcon, PauseIcon } from "@/assets/icons";
import { 
  startRecording, 
  stopRecording, 
  pauseRecording, 
  resumeRecording, 
  formatTime 
} from "@/lib/audioRecorder";
import type { RecorderState } from "@/lib/audioRecorder";

interface AudioRecorderProps {
  recorderState: any; // Using any to avoid circular dependencies
  recorderDispatch: React.Dispatch<any>;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ recorderState, recorderDispatch }) => {
  const [recordingTime, setRecordingTime] = useState<number>(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (recorderState.isRecording && !recorderState.isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
        
        const minutes = Math.floor(recordingTime / 60);
        const seconds = recordingTime % 60;
        
        recorderDispatch({
          type: "SET_RECORDING_TIME",
          payload: { minutes, seconds }
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [recorderState.isRecording, recorderState.isPaused, recordingTime, recorderDispatch]);
  
  const handleStartRecording = () => {
    startRecording(recorderDispatch);
    setRecordingTime(0);
  };
  
  const handleStopRecording = () => {
    stopRecording(recorderState);
    recorderDispatch({ type: "STOP_RECORDING" });
  };
  
  const handlePauseRecording = () => {
    pauseRecording(recorderState);
    recorderDispatch({ type: "PAUSE_RECORDING" });
  };
  
  const handleResumeRecording = () => {
    resumeRecording(recorderState);
    recorderDispatch({ type: "RESUME_RECORDING" });
  };
  
  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;
  const formattedTime = formatTime(minutes, seconds);
  
  return (
    <div>
      <div className={`audio-wave ${!recorderState.isRecording || recorderState.isPaused ? 'paused' : ''}`}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      
      {recorderState.isRecording && (
        <div className="text-center mb-4">
          <p className="text-sm font-medium">{formattedTime}</p>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        {!recorderState.isRecording ? (
          <Button
            onClick={handleStartRecording}
            className="bg-neutral-light hover:bg-neutral-medium text-neutral-dark hover:text-white rounded-lg px-5 py-2 text-sm font-medium transition duration-200 flex items-center"
          >
            <MicrophoneIcon className="h-4 w-4 mr-2" />
            Record
          </Button>
        ) : (
          <>
            {recorderState.isPaused ? (
              <Button
                onClick={handleResumeRecording}
                variant="outline"
              >
                Resume
              </Button>
            ) : (
              <Button
                onClick={handlePauseRecording}
                variant="outline"
              >
                <PauseIcon className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            <Button
              onClick={handleStopRecording}
              variant="destructive"
            >
              <StopIcon className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
