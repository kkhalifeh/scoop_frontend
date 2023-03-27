import axios from 'axios';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getIdToken } from 'firebase/auth';
import auth from './firebaseConfig';
import { storeData } from '../utils/storage';
import { decodeFirebaseIdToken, hasTokenExpired } from '../helpers/tokenHelper';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const loginUser = async (email, password, forceRefresh = false) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName, photoURL } = userCredential.user;

    // Get Firebase token and check if it's expired
    const firebaseToken = await userCredential.user.getIdToken(forceRefresh);
    const isTokenExpired = hasTokenExpired(firebaseToken);
    console.log('TOKEN REACT', firebaseToken);
    console.log('Is token expired?', isTokenExpired);

    // If the token is expired and forceRefresh is not set, you can decide to refresh the token by calling loginUser with forceRefresh = true
    if (isTokenExpired && !forceRefresh) {
      console.log('Token is expired, refreshing...');
      return loginUser(email, password, true);
    }

    const decodedToken = decodeFirebaseIdToken(firebaseToken);

    const apiResponse = await api.post('/api/v1/firebase_sessions/create', { firebase_id_token: firebaseToken, decoded_token: decodedToken }, {
      headers: {
        'Authorization': `Bearer ${firebaseToken}`
      }
    });

    const railsApiToken = apiResponse.data.token;
    const userData = { uid, email: userEmail, userName: apiResponse.data.user.username, firstName: apiResponse.data.user.first_name, lastName: apiResponse.data.user.last_name, photoURL, apiToken: railsApiToken, id: apiResponse.data.user.id, mobileNumber: apiResponse.data.user.mobile_number };

    const userResponse = await api.get(`/api/v1/users/${userData.id}?firebase_id_token=${firebaseToken}&decoded_token=${decodedToken}`, {
      headers: {
        'Authorization': `Bearer ${firebaseToken}`
      }
    });


    // Store user data
    await storeData('user', userData);

    // Update axios instance with API token
    api.defaults.headers.common['Authorization'] = `Bearer ${railsApiToken}`;

    debugger

    return { userData, decodedToken };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const signupUser = async (userData) => {
  try {
    const { email, password } = userData;

    // Sign up user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);



    // Get Firebase token
    const firebaseToken = await userCredential.user.getIdToken();
    const isTokenExpired = hasTokenExpired(firebaseToken);
    console.log('TOKEN REACT', firebaseToken);
    console.log('Is token expired?', isTokenExpired);

    // If the token is expired and forceRefresh is not set, you can decide to refresh the token by calling loginUser with forceRefresh = true
    if (isTokenExpired && !forceRefresh) {
      console.log('Token is expired, refreshing...');
      return loginUser(email, password, true);
    }

    // Create user data object with Firebase token
    const userDataWithToken = {
      email,
      uid: firebaseToken,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };


    const decodedToken = decodeFirebaseIdToken(firebaseToken);

    // Send user data to Rails API for registration
    const apiResponse = await api.post('/api/v1/users', { user: userDataWithToken }, {
      headers: {
        'Authorization': `Bearer ${firebaseToken}`
      }
    });



    const railsApiToken = await apiResponse.data.user.uid;
    const userDataResponse = { uid: railsApiToken, email: apiResponse.data.user.email, userName: apiResponse.data.user.username, firstName: apiResponse.data.user.first_name, lastName: apiResponse.data.user.last_name, apiToken: railsApiToken, id: apiResponse.data.user.id, mobileNumber: apiResponse.data.user.mobile_number };

    debugger

    // Store user data
    await storeData('user', userDataResponse);

    debugger

    // Update axios instance with API token
    api.defaults.headers.common['Authorization'] = `Bearer ${railsApiToken}`;

    return { userDataResponse, decodedToken };
  } catch (error) {
    console.error('Error signing up:', error);
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
  signupUser,
  api
};
