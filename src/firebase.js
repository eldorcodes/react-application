// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUhIHToRZbEQilXnyUcJjVaSEGmG7qSEo",
  authDomain: "application-form-d3d01.firebaseapp.com",
  projectId: "application-form-d3d01",
  storageBucket: "application-form-d3d01.appspot.com",
  messagingSenderId: "199713048392",
  appId: "1:199713048392:web:efd6a665c225e273cbd57d",
  measurementId: "G-JZ45Y58RG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;