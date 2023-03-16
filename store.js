import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/reducers/userReducer';


const rootReducer = {
  user: userReducer,
  // Add other reducers if needed
};

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware if needed, e.g., middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware)
});

export default store;
