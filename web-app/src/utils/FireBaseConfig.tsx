// src/FireBaseConfig.ts
import fbConfig from './Config.json'; // Import your Firebase config
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Use the values directly from the JSON file
const config = {
  apiKey: fbConfig.REACT_APP_FIREBASE_API_KEY,
  authDomain: fbConfig.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: fbConfig.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: fbConfig.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbConfig.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: fbConfig.REACT_APP_FIREBASE_APP_ID,
  measurementId: fbConfig.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// console.log(config);

// Initialize Firebase app (this should happen once)
const app = initializeApp(config);

// Initialize Firebase Authentication and Firestore (also should happen once)
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export both auth and db
export { auth, db };
