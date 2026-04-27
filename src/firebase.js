import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEF_Dxv7xWKOYtdmxdJ9td-A9uSHorToA",
  authDomain: "navrachna-web.firebaseapp.com",
  projectId: "navrachna-web",
  storageBucket: "navrachna-web.firebasestorage.app",
  messagingSenderId: "8340757112",
  appId: "1:8340757112:web:db12023f5f3db4f445ab8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
