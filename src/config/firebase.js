import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAr6ekKTuYjr7pDXO5RO1fJ2MFPt12WMCA",
  authDomain: "asst-987dd.firebaseapp.com",
  databaseURL: "https://asst-987dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asst-987dd",
  storageBucket: "asst-987dd.appspot.com",
  messagingSenderId: "629126385889",
  appId: "1:629126385889:web:e74b9e87b89a65025627a0",
  measurementId: "G-MPJX7D692C"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const fb_auth = firebase.auth();

export default app;