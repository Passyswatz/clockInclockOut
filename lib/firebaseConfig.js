// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4DJhA5lo9FAIiv32q5hUbWgx2Rw6wzPk",
  authDomain: "attendance-app-89fbc.firebaseapp.com",
  projectId: "attendance-app-89fbc",
  storageBucket: "attendance-app-89fbc.appspot.com",
  messagingSenderId: "382838567355",
  appId: "1:382838567355:web:8b436777cdf3ff7bddd49e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db}