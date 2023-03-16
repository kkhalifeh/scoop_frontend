import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { getData } from './utils/storage';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getData('user');
      if (userData) {
        store.dispatch({ type: 'LOGIN', payload: userData });
      }
      setUserDataLoaded(true);
    };

    loadUserData();
  }, []);

  return (
    <Provider store={store}>
      {userDataLoaded && <AppNavigator />}
    </Provider>
  );
};

export default App;
