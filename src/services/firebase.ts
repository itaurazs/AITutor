import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if we have valid Firebase configuration
const hasValidConfig = firebaseConfig.apiKey && 
                      firebaseConfig.authDomain && 
                      firebaseConfig.projectId &&
                      firebaseConfig.apiKey !== 'your_firebase_api_key' &&
                      firebaseConfig.apiKey !== 'your_actual_firebase_api_key_here' &&
                      firebaseConfig.authDomain !== 'your-actual-project.firebaseapp.com' &&
                      firebaseConfig.projectId !== 'your-actual-project-id' &&
                      !firebaseConfig.apiKey.includes('your_') &&
                      !firebaseConfig.apiKey.includes('your-');

let app;
let auth;
let db;
let analytics = null;

if (hasValidConfig) {
  // Initialize Firebase only if we have valid configuration
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
  
  // Initialize Analytics only in browser environment and with valid config
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Firebase Analytics initialization failed:', error);
      analytics = null;
    }
  }
} else {
  console.warn('Firebase configuration is missing or invalid. Please check your environment variables.');
  
  // Create mock objects to prevent runtime errors
  auth = null;
  db = null;
}

export { auth, db, analytics };
export default app;