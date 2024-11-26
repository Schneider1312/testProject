import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBF9J4z9ArHpaf682sSV4F4YFWerEUuXgY",
  authDomain: "tstprjct-36e10.firebaseapp.com",
  projectId: "tstprjct-36e10",
  storageBucket: "tstprjct-36e10.firebasestorage.app",
  messagingSenderId: "21976212591",
  appId: "1:21976212591:web:9bd2a94d7d53214d6c599a",
  measurementId: "G-4SGPF4S6KH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);