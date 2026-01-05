// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtaPsDGIxBWWBi5v08q66_xTm5TSQIQtQ",
  authDomain: "project-d2ff1.firebaseapp.com",
  projectId: "project-d2ff1",
  storageBucket: "project-d2ff1.firebasestorage.app",
  messagingSenderId: "227277200902",
  appId: "1:227277200902:web:c52a0a10afe0d92f1aad87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;