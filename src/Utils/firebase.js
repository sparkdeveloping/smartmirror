// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-96I5DLvLZF2bIJeswX4G4CmbEtcaATE",
  authDomain: "school-d09aa.firebaseapp.com",
  databaseURL: "https://school-d09aa.firebaseio.com",
  projectId: "school-d09aa",
  storageBucket: "school-d09aa.appspot.com",
  messagingSenderId: "467373754147",
  appId: "1:467373754147:web:473256867ff13fb6546e96",
  measurementId: "G-TB6KW8EJDZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
