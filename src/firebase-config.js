// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoIu-aNLZRRYP9Usq7E_WQc3o6UXAsLwE",
  authDomain: "educonnect-8e661.firebaseapp.com",
  projectId: "educonnect-8e661",
  storageBucket: "educonnect-8e661.appspot.com",
  messagingSenderId: "831334089530",
  appId: "1:831334089530:web:469ecff0d019ce9e290603",
  measurementId: "G-014P5T5VL5",
  databaseURL: "https://educonnect-8e661-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app)

export { auth };
export {database};