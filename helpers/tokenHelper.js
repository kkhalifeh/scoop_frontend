import jwt_decode from 'jwt-decode';

export const decodeFirebaseIdToken = (idToken) => {
  try {
    const decodedToken = jwt_decode(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding Firebase ID token:', error);
    return null;
  }
};

export const hasTokenExpired = (idToken) => {
  const decodedToken = decodeFirebaseIdToken(idToken);
  if (decodedToken) {
    const currentTime = Date.now() / 1000;
    return currentTime > decodedToken.exp;
  }
  return true;
};
