import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { UserPlus, Loader2, CheckCircle, AlertTriangle, User } from "lucide-react";
import { saveStudent, studentExists } from "../lib/studentStorage";
import { getFaceDescriptor, getAllFaceDescriptors } from "../lib/faceRecognition";

export const StudentEnrollment = ({ onStudentAdded, modelsLoaded }) => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceValidated, setFaceValidated] = useState(null);
  const [faceError, setFaceError] = useState(null);

  const imageInputRef = useRef(null);
  const imageRef = useRef(null);

  const validateFace = useCallback(
    async (imgElement) => {
      if (!modelsLoaded) return { valid: false, error: "Face recognition models not loaded yet" };
      try {
        const allDescriptors = await getAllFaceDescriptors(imgElement);

        if (allDescriptors.length === 0)
          return { valid: false, error: "No face detected. Upload a clear photo with one visible face." };

        if (allDescriptors.length > 1)
          return {
            valid: false,
            error: `Multiple faces (${allDescriptors.length}) detected. Upload an image with only ONE face.`,
          };

        const descriptor = await getFaceDescriptor(imgElement);
        if (!descriptor)
          return { valid: false, error: "Could not extract face features. Try a different image." };

        return { valid: true, descriptor };
      } catch (err) {
        console.error(err);
        return { valid: false, error: "Error processing image. Please try again." };
      }
    },
    [modelsLoaded]
  );

  const handleImageChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setFaceValidated(null);
      setFaceError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setImagePreview(dataUrl);

        const img = new Image();
        img.onload = async () => {
          setIsProcessing(true);
          const result = await validateFace(img);
          setIsProcessing(false);

          if (result.valid) {
            setFaceValidated(true);
            setFaceError(null);
            toast.success("Face detected successfully!");
          } else {
            setFaceValidated(false);
            setFaceError(result.error || "Face validation failed");
            toast.error(result.error || "Face validation failed");
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [validateFace]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNo.trim()) return toast.error("Please enter a Roll Number");
    if (!name.trim()) return toast.error("Please enter Student Name");
    if (!imagePreview) return toast.error("Please upload a face image");
    if (!faceValidated) return toast.error("Please upload a valid image with exactly one face");

    setIsProcessing(true);

    try {
      const exists = await studentExists(rollNo.trim());
      if (exists) {
        toast.error(`Roll Number "${rollNo}" already exists`);
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      img.src = imagePreview;
      await new Promise((resolve) => (img.onload = resolve));

      const descriptor = await getFaceDescriptor(img);
      if (!descriptor) {
        toast.error("Failed to extract face features. Try a different image.");
        setIsProcessing(false);
        return;
      }

      const newStudent = {
        rollNo: rollNo.trim(),
        name: name.trim(),
        gender,
        imageUrl: imagePreview,
        descriptor,
      };

      await saveStudent(newStudent);
      onStudentAdded(newStudent);
      toast.success(`Student "${name}" enrolled successfully!`);

      // Reset form
      setRollNo("");
      setName("");
      setGender("Male");
      setImagePreview(null);
      setFaceValidated(null);
      setFaceError(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Failed to enroll student. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFaceValidated(null);
    setFaceError(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-xl border p-6 shadow-md animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Add / Register Student</h3>
          <p className="text-sm text-gray-500">Enroll new students for attendance tracking</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Roll No */}
        <div>
          <label className="text-sm font-medium">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 001"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isProcessing}
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium">
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isProcessing}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isProcessing}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Face Image */}
        <div>
          <label className="text-sm font-medium">
            Face Image <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Upload a clear photo with exactly ONE visible face
          </p>

          {imagePreview ? (
            <div className="mt-2 space-y-3">
              <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden border">
                <img
                  ref={imageRef}
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                )}
              </div>

              {faceValidated === true && (
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Face detected successfully</span>
                </div>
              )}

              {faceValidated === false && faceError && (
                <div className="flex items-center justify-center gap-2 text-red-600 text-sm text-center">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{faceError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={clearImage}
                disabled={isProcessing}
                className="w-full px-3 py-2 border rounded-md hover:bg-gray-100 transition"
              >
                Remove & Upload Different Image
              </button>
            </div>
          ) : (
            <div
              className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition"
              onClick={() => imageInputRef.current?.click()}
            >
              <User className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload face image</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP supported</p>
            </div>
          )}

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isProcessing}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing || !modelsLoaded || !faceValidated}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:opacity-90 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Add Student
            </>
          )}
        </button>

        {!modelsLoaded && (
          <p className="text-xs text-center text-gray-500">
            Waiting for face recognition models to load...
          </p>
        )}
      </form>
    </div>
  );
};
