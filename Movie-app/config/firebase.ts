// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGR29QAj93E92vzQcwJpzFMz63DUoN-mw",
  authDomain: "movieapp-80e7e.firebaseapp.com",
  projectId: "movieapp-80e7e",
  storageBucket: "movieapp-80e7e.appspot.com",
  messagingSenderId: "57166146082",
  appId: "1:57166146082:web:8f4b9b1222eec4d845f87b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
export {auth,firestore}