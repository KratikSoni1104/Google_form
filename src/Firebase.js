// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwW1V_e6s7EPbxLgjKqlA8Olixo92O5-g",
  authDomain: "sylvan-cocoa-395605.firebaseapp.com",
  projectId: "sylvan-cocoa-395605",
  storageBucket: "sylvan-cocoa-395605.appspot.com",
  messagingSenderId: "447174770603",
  appId: "1:447174770603:web:9cb17324fa6946fc985cee",
  measurementId: "G-YMQ75KCRK1"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;