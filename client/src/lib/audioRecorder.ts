type RecorderState = {
  recordingMinutes: number;
  recordingSeconds: number;
  initRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  mediaStream: MediaStream | null;
  audio: string | null;
  isRecording: boolean;
  isPaused: boolean;
};

type RecorderAction = 
  | { type: "START_RECORDING"; payload: { mediaStream: MediaStream; mediaRecorder: MediaRecorder } } 
  | { type: "STOP_RECORDING" }
  | { type: "PAUSE_RECORDING" }
  | { type: "RESUME_RECORDING" }
  | { type: "RESET_RECORDER" }
  | { type: "SET_RECORDING_TIME"; payload: { minutes: number; seconds: number } }
  | { type: "SET_AUDIO"; payload: { audio: string } };

export const initialState: RecorderState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  isRecording: false,
  isPaused: false,
};

export const recorderReducer = (state: RecorderState, action: RecorderAction): RecorderState => {
  switch (action.type) {
    case "START_RECORDING":
      return {
        ...state,
        initRecording: true,
        mediaStream: action.payload.mediaStream,
        mediaRecorder: action.payload.mediaRecorder,
        isRecording: true,
      };
    case "STOP_RECORDING":
      return {
        ...state,
        isRecording: false,
        isPaused: false,
      };
    case "PAUSE_RECORDING":
      return {
        ...state,
        isPaused: true,
      };
    case "RESUME_RECORDING":
      return {
        ...state,
        isPaused: false,
      };
    case "RESET_RECORDER":
      return {
        ...initialState,
      };
    case "SET_RECORDING_TIME":
      return {
        ...state,
        recordingMinutes: action.payload.minutes,
        recordingSeconds: action.payload.seconds,
      };
    case "SET_AUDIO":
      return {
        ...state,
        audio: action.payload.audio,
      };
    default:
      return state;
  }
};

export const startRecording = async (dispatch: React.Dispatch<RecorderAction>) => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    
    const mediaRecorder = new MediaRecorder(mediaStream);
    
    dispatch({ 
      type: "START_RECORDING", 
      payload: { 
        mediaStream, 
        mediaRecorder 
      } 
    });
    
    let chunks: BlobPart[] = [];
    
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      chunks = [];
      const audioURL = URL.createObjectURL(blob);
      dispatch({ type: "SET_AUDIO", payload: { audio: audioURL } });
    };
    
    mediaRecorder.start();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

export const stopRecording = (state: RecorderState) => {
  if (state.mediaRecorder && state.isRecording) {
    state.mediaRecorder.stop();
    state.mediaStream?.getTracks().forEach(track => track.stop());
  }
};

export const pauseRecording = (state: RecorderState) => {
  if (state.mediaRecorder && state.isRecording && !state.isPaused) {
    state.mediaRecorder.pause();
  }
};

export const resumeRecording = (state: RecorderState) => {
  if (state.mediaRecorder && state.isRecording && state.isPaused) {
    state.mediaRecorder.resume();
  }
};

export const saveRecording = async (audioBlob: Blob, recordingId: string): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('recordingId', recordingId);
    
    const response = await fetch('/api/recordings', {
      method: 'POST',
      body: formData,
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error saving recording:', error);
    return false;
  }
};

export const formatTime = (minutes: number, seconds: number): string => {
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
