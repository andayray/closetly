// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyC1JFZgemz63uLQ6ZsnbtFtDBqWe63XTXs',
    authDomain: 'auth-for-closetly.firebaseapp.com',
    projectId: 'auth-for-closetly',
    storageBucket: 'auth-for-closetly.appspot.com',
    messagingSenderId: '318990444412',
    appId: '1:318990444412:web:ee142ad7bad3b55da2a6f9',
    measurementId: 'G-RR3X27F3MW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }