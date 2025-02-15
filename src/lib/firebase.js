// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYINcxoVFd-PPsRugLnAhYaqonXXS7vZA",
  authDomain: "task-management-acd93.firebaseapp.com",
  projectId: "task-management-acd93",
  storageBucket: "task-management-acd93.firebasestorage.app",
  messagingSenderId: "402123669421",
  appId: "1:402123669421:web:15dac0a43304eb6b2feb24",
  measurementId: "G-D1J7YM82G3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
