// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD8eOPOwd-lwHVzdFj-jyIqhXH2xcsrSCk',
  authDomain: 'yugioh-card-tracker.firebaseapp.com',
  projectId: 'yugioh-card-tracker',
  storageBucket: 'yugioh-card-tracker.appspot.com',
  messagingSenderId: '194613131220',
  appId: '1:194613131220:web:9fcda8d3e420feed1a0841',
  measurementId: 'G-2KFB2NCM7F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
