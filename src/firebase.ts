import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-84yWsT8KiiMpUWF-oO5BkOZhahMcYp4",
  authDomain: "movie-to-watch-161f0.firebaseapp.com",
  projectId: "movie-to-watch-161f0",
  storageBucket: "movie-to-watch-161f0.firebasestorage.app",
  messagingSenderId: "804069949342",
  appId: "1:804069949342:web:1eb99158eb47599b9ea08f",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
