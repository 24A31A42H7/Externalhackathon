import { useRef, useState, useCallback } from "react";
import { Upload, Image, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

export const ImageUpload = ({ onImageLoad, isProcessing }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageElement, setImageElement] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = document.createElement("img");
    img.onload = () => {
      setImageElement(img);
      toast.success("Image loaded successfully");
    };
    img.onerror = () => {
      toast.error("Failed to load image");
      setPreviewUrl(null);
    };
    img.src = url;
  }, []);

  const handleProcess = useCallback(() => {
    if (imageElement) {
      onImageLoad(imageElement);
    }
  }, [imageElement, onImageLoad]);

  const clearImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setImageElement(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [previewUrl]);

  return (
    <div className="space-y-4">
      {/* Image Preview Area */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Uploaded"
              className="w-full h-full object-contain"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:opacity-90"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
            <div className="text-center">
              <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-1">
                Click to upload class photo
              </p>
              <p className="text-sm text-gray-400">
                Supports JPG, PNG, WebP
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="font-medium">Processing faces...</span>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1 border px-4 py-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <Upload className="w-4 h-4 inline mr-2" />
          {previewUrl ? "Change Image" : "Upload Image"}
        </button>

        {previewUrl && (
          <button
            onClick={handleProcess}
            disabled={isProcessing || !imageElement}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 inline mr-2 ${
                isProcessing ? "animate-spin" : ""
              }`}
            />
            Scan Faces
          </button>
        )}
      </div>
    </div>
  );
};
