import { useRef, useState, useCallback, useEffect } from "react";
import { Video, VideoOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const WebcamCapture = ({ onCapture, isProcessing }) => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState(null);

  const startWebcam = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setStream(mediaStream);
        setIsStreaming(true);
        toast.success("Webcam started successfully");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      toast.error("Failed to access webcam. Please check permissions.");
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && isStreaming) {
      onCapture(videoRef.current);
    }
  }, [isStreaming, onCapture]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="space-y-4">
      {/* Video Display */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Video className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Click "Start Webcam" to begin</p>
            </div>
          </div>
        )}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-800 font-medium">Processing faces...</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isStreaming ? (
          <button
            onClick={startWebcam}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <Video className="w-4 h-4" />
            Start Webcam
          </button>
        ) : (
          <>
            <button
              onClick={stopWebcam}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <VideoOff className="w-4 h-4" />
              Stop Webcam
            </button>
            <button
              onClick={handleCapture}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
              Scan Faces
            </button>
          </>
        )}
      </div>
    </div>
  );
};
