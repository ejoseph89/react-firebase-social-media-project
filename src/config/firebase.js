// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxKnEZO2GfVjupxjalv11WF-0_PZxmlks",
  authDomain: "react-practice-project-sm.firebaseapp.com",
  projectId: "react-practice-project-sm",
  storageBucket: "react-practice-project-sm.appspot.com",
  messagingSenderId: "426157515628",
  appId: "1:426157515628:web:397b0bd1a4acaaf0ad0949",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
