// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1JFZgemz63uLQ6ZsnbtFtDBqWe63XTXs",
  authDomain: "auth-for-closetly.firebaseapp.com",
  projectId: "auth-for-closetly",
  storageBucket: "auth-for-closetly.firebasestorage.app",
  messagingSenderId: "318990444412",
  appId: "1:318990444412:web:ee142ad7bad3b55da2a6f9",
  measurementId: "G-RR3X27F3MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth };