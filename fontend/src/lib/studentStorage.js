const DB_NAME = 'AttendanceSystemDB';
const DB_VERSION = 1;
const STORE_NAME = 'students';

let db = null;

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'rollNo' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('gender', 'gender', { unique: false });
      }
    };
  });
};

const studentToStored = (student) => {
  const { descriptor, ...rest } = student;
  return {
    ...rest,
    descriptorArray: descriptor ? Array.from(descriptor) : undefined,
  };
};

const storedToStudent = (stored) => {
  const { descriptorArray, ...rest } = stored;
  return {
    ...rest,
    descriptor: descriptorArray ? new Float32Array(descriptorArray) : undefined,
  };
};

export const saveStudent = async (student) => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(studentToStored(student));

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const getStudent = async (rollNo) => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(rollNo);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? storedToStudent(result) : null);
    };
  });
};

export const getAllStudents = async () => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const results = request.result;
      resolve(results.map(storedToStudent));
    };
  });
};

export const deleteStudent = async (rollNo) => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(rollNo);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const deleteAllStudents = async () => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const studentExists = async (rollNo) => {
  const student = await getStudent(rollNo);
  return student !== null;
};

export const exportStudentsToCSV = (students) => {
  const headers = 'Roll No,Name,Gender,ImageFile';
  const rows = students.map(s => `${s.rollNo},${s.name},${s.gender},${s.imageUrl}`);
  return [headers, ...rows].join('\n');
};
