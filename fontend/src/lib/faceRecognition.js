import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

let modelsLoaded = false;

export const loadFaceApiModels = async () => {
  if (modelsLoaded) return;
  
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
    console.log('Face-api models loaded successfully');
  } catch (error) {
    console.error('Error loading face-api models:', error);
    throw new Error('Failed to load face recognition models');
  }
};

export const getFaceDescriptor = async (imageElement) => {
  try {
    const detection = await faceapi
      .detectSingleFace(imageElement)
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    return detection ? detection.descriptor : null;
  } catch (error) {
    console.error('Error getting face descriptor:', error);
    return null;
  }
};

export const getAllFaceDescriptors = async (imageElement) => {
  try {
    const detections = await faceapi
      .detectAllFaces(imageElement)
      .withFaceLandmarks()
      .withFaceDescriptors();
    
    return detections.map(d => d.descriptor);
  } catch (error) {
    console.error('Error getting all face descriptors:', error);
    return [];
  }
};

export const compareFaces = (descriptor1, descriptor2, threshold = 0.6) => {
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  return distance < threshold;
};

export const findMatchingStudent = (detectedDescriptor, studentDescriptors, threshold = 0.6) => {
  let bestMatch = null;
  let bestDistance = threshold;

  for (const student of studentDescriptors) {
    const distance = faceapi.euclideanDistance(detectedDescriptor, student.descriptor);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = student.rollNo;
    }
  }

  return bestMatch;
};

export const drawDetections = async (canvas, imageElement, presentStudents, studentDescriptors) => {
  const displaySize = {
    width: imageElement.width || imageElement.videoWidth,
    height: imageElement.height || imageElement.videoHeight
  };
  faceapi.matchDimensions(canvas, displaySize);

  const detections = await faceapi
    .detectAllFaces(imageElement)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const resizedDetections = faceapi.resizeResults(detections, displaySize);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  resizedDetections.forEach(detection => {
    const box = detection.detection.box;
    const matchedRollNo = findMatchingStudent(detection.descriptor, studentDescriptors, 0.6);

    const student = studentDescriptors.find(s => s.rollNo === matchedRollNo);
    const label = student ? student.name : 'Unknown';
    const isRecognized = !!matchedRollNo;

    ctx.strokeStyle = isRecognized ? '#10b981' : '#ef4444';
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    ctx.fillStyle = isRecognized ? '#10b981' : '#ef4444';
    ctx.fillRect(box.x, box.y - 25, box.width, 25);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter';
    ctx.fillText(label, box.x + 5, box.y - 8);
  });
};
