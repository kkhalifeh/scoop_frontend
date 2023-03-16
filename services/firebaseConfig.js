import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1ggGaPTTl3dt5XxvoDc_tYTZcAMhUFWY",
  authDomain: "scoop-8baed.firebaseapp.com",
  projectId: "scoop-8baed",
  storageBucket: "scoop-8baed.appspot.com",
  messagingSenderId: "769182139422",
  appId: "1:769182139422:web:a985d22c234aebdff75a0f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
