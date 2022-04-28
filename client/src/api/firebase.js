// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO6nmVxlNQ0NFoYmkZ_AqMsuCUUtKGMfM",
  authDomain: "studentprogress-76861.firebaseapp.com",
  projectId: "studentprogress-76861",
  storageBucket: "studentprogress-76861.appspot.com",
  messagingSenderId: "701800435173",
  appId: "1:701800435173:web:066d4303119f17bd05730c"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);