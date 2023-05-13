import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API || "AIzaSyAvzNp6twa8M03skYXxCAAz-V4HCtkBhJ8",
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN || "trippin-9bd95.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "trippin-9bd95",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "trippin-9bd95.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID || "347754242680",
  appId: process.env.REACT_APP_FIREBASE_AUTH_ID || "1:347754242680:web:141753dcde5a3d8ffcc38d",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || "G-4Q0PT0910T",
};

export const app = initializeApp(firebaseConfig);

export default getAuth(app);
