
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4546GwwKPR73hjjpwwRiZR9eyB0NtNYA",
  authDomain: "mpst-christmas-party.firebaseapp.com",
  projectId: "mpst-christmas-party",
  storageBucket: "mpst-christmas-party.firebasestorage.app",
  messagingSenderId: "545462307774",
  appId: "1:545462307774:web:73157dc5aaca0035ae47ef"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
