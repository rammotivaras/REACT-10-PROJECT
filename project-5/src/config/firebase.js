// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATgq3--xq3mmUkVMog8K87mqQWDlzZjnc",
  authDomain: "vite-contact-e6318.firebaseapp.com",
  projectId: "vite-contact-e6318",
  storageBucket: "vite-contact-e6318.appspot.com",
  messagingSenderId: "499974848667",
  appId: "1:499974848667:web:d2f5898428666cc4b6c63e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);