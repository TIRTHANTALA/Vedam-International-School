import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace these placeholders with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAwVThDruC5jNVv45SNcQoQEHmWWtZAfsI",
  authDomain: "vedam-school.firebaseapp.com",
  projectId: "vedam-school",
  storageBucket: "vedam-school.firebasestorage.app",
  messagingSenderId: "800160725503",
  appId: "1:800160725503:web:0897c430f6040fa9994fca",
  measurementId: "G-50J82TZL87"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

