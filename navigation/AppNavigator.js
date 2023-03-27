import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../components/screens/LoginScreen';
import HomeScreen from '../components/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from '../components/screens/SignupScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.user.user);

  console.log('User', user)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;