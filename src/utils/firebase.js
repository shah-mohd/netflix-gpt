// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxh-RHp6-XvVOMGQ8hNu-lVeh2M8mL4oM",
  authDomain: "netflixgpt-sm.firebaseapp.com",
  projectId: "netflixgpt-sm",
  storageBucket: "netflixgpt-sm.firebasestorage.app",
  messagingSenderId: "226994699787",
  appId: "1:226994699787:web:79f284b16767724ae7110e",
  measurementId: "G-YJ8TZQP3XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);