// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr4kVz8h1OD9t7yS6XrGWyjviPQgihDX0",
  authDomain: "motion-diary.firebaseapp.com",
  projectId: "motion-diary",
  storageBucket: "motion-diary.appspot.com",
  messagingSenderId: "377012502819",
  appId: "1:377012502819:web:f3c194c7a55d97bc020c96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
