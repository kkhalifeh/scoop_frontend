import axios from 'axios';
import { signInWithEmailAndPassword, signOut, getIdToken } from 'firebase/auth';
import auth from './firebaseConfig';
import { storeData } from '../utils/storage';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
    const firebaseToken = await userCredential.user.getIdToken();
    console.log('TOKEN REACT', firebaseToken)

    const apiResponse = await api.post('/api/v1/firebase_sessions/create', { firebase_id_token: firebaseToken });

    const railsApiToken = apiResponse.data.api_token;
    const userData = { uid, email: userEmail, displayName, photoURL, apiToken: railsApiToken };

    // Store user data
    await storeData('user', userData);

    // Update axios instance with API token
    api.defaults.headers.common['Authorization'] = `Bearer ${railsApiToken}`;

    return userData;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export {
  loginUser,
  logoutUser,
  api
};
