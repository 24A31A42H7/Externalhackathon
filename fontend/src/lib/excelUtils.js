import * as XLSX from 'xlsx';

// Generate attendance Excel from records
export const generateAttendanceExcel = (records, date = new Date()) => {
  const worksheet = XLSX.utils.json_to_sheet(
    records.map(r => ({
      'Roll No': r.rollNo,
      'Name': r.name,
      'Gender': r.gender,
      'Status': r.status,
    }))
  );

  const colWidths = [
    { wch: 12 },
    { wch: 25 },
    { wch: 10 },
    { wch: 10 },
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '_');
  const fileName = `attendance_${dateStr}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};

// Parse students Excel file and return array
export const parseStudentsExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const students = jsonData.map(row => ({
          rollNo: String(row['Roll No'] || row['rollNo'] || row['RollNo'] || ''),
          name: String(row['Name'] || row['name'] || ''),
          gender: (row['Gender'] || row['gender'] || 'Male').toLowerCase() === 'female' ? 'Female' : 'Male',
          imageUrl: String(row['ImageFile'] || row['imageFile'] || row['Image'] || ''),
        }));

        resolve(students.filter(s => s.rollNo && s.name));
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

// Download a sample Excel template for students
export const downloadSampleTemplate = () => {
  const sampleData = [
    { 'Roll No': '001', 'Name': 'John Doe', 'Gender': 'Male', 'ImageFile': 'student_001.jpg' },
    { 'Roll No': '002', 'Name': 'Jane Smith', 'Gender': 'Female', 'ImageFile': 'student_002.jpg' },
    { 'Roll No': '003', 'Name': 'Bob Wilson', 'Gender': 'Male', 'ImageFile': 'student_003.jpg' },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  XLSX.writeFile(workbook, 'students_template.xlsx');
};
