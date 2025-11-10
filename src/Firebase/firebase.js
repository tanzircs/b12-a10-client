// import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// };
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfHkUfQrBs7RJl43gNLO7BVUFmi4hJQII",
  authDomain: "b12-a10.firebaseapp.com",
  projectId: "b12-a10",
  storageBucket: "b12-a10.firebasestorage.app",
  messagingSenderId: "1075960104713",
  appId: "1:1075960104713:web:a879a7046d9edba025b5d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

