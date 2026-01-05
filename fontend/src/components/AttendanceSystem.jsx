import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Camera,
  Upload,
  Radio,
  FileDown,
  Loader2,
  Scan,
  Users,
  AlertCircle,
} from "lucide-react";

import { WebcamCapture } from "./WebcamCapture";
import { ImageUpload } from "./ImageUpload";
import { StatsCards } from "./StatsCards";
//import { AttendanceTable } from "../AttendanceTable";
import { AttendanceTable } from "./AttendenceTable";
//import { StudentEnrollment } from "../StudentEnrollment";
import { StudentEnrollment } from "./StudentEnrollment";

//import { generateAttendanceExcel } from "@/lib/excelUtils";
//import { generateAttendanceExcel } from "../lib/excelUtils";
import {generateAttendanceExcel} from "../lib/excelUtils"
import {
  loadFaceApiModels,
  getAllFaceDescriptors,
  findMatchingStudent,
} from "../lib/faceRecognition";
import { calculateStats } from "../lib/studentData";
import { getAllStudents, deleteStudent } from "../lib/studentStorage";
import UploadAttendanceExcel from "./UploadAttendanceExcel";

const AttendanceSystem=()=> {

  const [students, setStudents] = useState([]);
  const [presentRollNumbers, setPresentRollNumbers] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [activeTab, setActiveTab] = useState("webcam");
  const [rtspUrl, setRtspUrl] = useState("");

  const stats = calculateStats(students, presentRollNumbers);

  /* Load models */
  useEffect(() => {
    const loadModels = async () => {
      try {
        await loadFaceApiModels();
        setModelsLoaded(true);
        toast.success("Face recognition models loaded");
      } catch {
        toast.error("Failed to load face models");
      } finally {
        setIsLoadingModels(false);
      }
    };
    loadModels();
  }, []);

  /* Load students */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch {
        toast.error("Failed to load students");
      } finally {
        setIsLoadingStudents(false);
      }
    };
    loadStudents();
  }, []);

  const handleStudentAdded = useCallback((student) => {
    setStudents((prev) => [...prev, student]);
  }, []);

  const handleDeleteStudent = useCallback(async (rollNo) => {
    try {
      await deleteStudent(rollNo);
      setStudents((prev) => prev.filter((s) => s.rollNo !== rollNo));
      setPresentRollNumbers((prev) => {
        const set = new Set(prev);
        set.delete(rollNo);
        return set;
      });
      toast.success("Student removed");
    } catch {
      toast.error("Delete failed");
    }
  }, []);

  const processImage = useCallback(
    async (imageElement) => {
      if (!modelsLoaded) {
        toast.error("Models not loaded");
        return;
      }

      if (students.length === 0) {
        toast.error("No students enrolled");
        return;
      }

      setIsProcessing(true);

      try {
        const detected = await getAllFaceDescriptors(imageElement);

        if (detected.length === 0) {
          toast.warning("No faces detected");
          return;
        }

        const enrolled = students
          .filter((s) => s.descriptor)
          .map((s) => ({
            rollNo: s.rollNo,
            descriptor: s.descriptor,
          }));

        const matched = new Set();

        detected.forEach((desc) => {
          const rollNo = findMatchingStudent(desc, enrolled, 0.6);
          if (rollNo) matched.add(rollNo);
        });

        if (matched.size === 0) {
          toast.warning("No match found");
        } else {
          setPresentRollNumbers((prev) => new Set([...prev, ...matched]));
          toast.success(`${matched.size} students marked present`);
        }
      } catch {
        toast.error("Image processing failed");
      } finally {
        setIsProcessing(false);
      }
    },
    [modelsLoaded, students]
  );

  const generateReport = () => {
    if (students.length === 0) return;

    const records = students.map((s) => ({
      rollNo: s.rollNo,
      name: s.name,
      gender: s.gender,
      status: presentRollNumbers.has(s.rollNo) ? "Present" : "Absent",
    }));

    generateAttendanceExcel(records);
    toast.success("Excel downloaded");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
  {/* Header */}
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold flex items-center gap-2">
      <Scan /> Face Recognition Attendance
    </h1>

    {isLoadingModels ? (
      <Loader2 className="animate-spin" />
    ) : modelsLoaded ? (
      <span className="text-green-600">Models Ready</span>
    ) : (
      <span className="text-red-600">Model Error</span>
    )}
  </header>

  {/* ✅ TWO COLUMN LAYOUT */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* LEFT SIDE (Attendance) */}
    <div className="lg:col-span-2 space-y-6">
      <StatsCards stats={stats} />

      {/* Tabs */}
      <div>
        <div className="flex gap-3 mb-4">
          <button onClick={() => setActiveTab("webcam")}>Webcam</button>
          <button onClick={() => setActiveTab("upload")}>Upload</button>
          <button onClick={() => setActiveTab("rtsp")}>RTSP</button>
        </div>

        {activeTab === "webcam" && (
          <WebcamCapture
            onCapture={processImage}
            isProcessing={isProcessing}
          />
        )}

        {activeTab === "upload" && (
          <ImageUpload
            onImageLoad={processImage}
            isProcessing={isProcessing}
          />
        )}

        {activeTab === "rtsp" && (
          <div>
            <label>RTSP URL</label>
            <input
              value={rtspUrl}
              onChange={(e) => setRtspUrl(e.target.value)}
              placeholder="rtsp://camera-ip"
              className="border p-2 w-full"
            />
            <p className="text-sm text-gray-500">
              RTSP not supported directly in browser
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={generateReport}>
          <FileDown /> Generate Excel
        </button>

        <button onClick={() => setPresentRollNumbers(new Set())}>
          Reset Attendance
        </button>
      </div>

      <AttendanceTable
        students={students}
        presentRollNumbers={presentRollNumbers}
        onDeleteStudent={handleDeleteStudent}
      />
    </div>

    {/* RIGHT SIDE (Register Student) */}
    <div className="bg-white p-4 rounded-lg shadow">
      <StudentEnrollment
        onStudentAdded={handleStudentAdded}
        modelsLoaded={modelsLoaded}
      />
      <UploadAttendanceExcel/>
    </div>

  </div>
</div>

  );

}

export default AttendanceSystem;