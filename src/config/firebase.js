import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTLQKR-_vlCtqvJNRnGOLLFSzQK_gx2IY",
  authDomain: "patients-2e22e.firebaseapp.com",
  projectId: "patients-2e22e",
  storageBucket: "patients-2e22e.appspot.com",
  messagingSenderId: "824610679817",
  appId: "1:824610679817:web:caf4b04992785914c49cd8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const fb_auth = firebase.auth();

export default app;