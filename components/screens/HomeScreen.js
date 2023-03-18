import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logoutUser } from '../../services/api'
import { logoutUserAction } from '../../store/actions/userActions'
import { useDispatch } from 'react-redux';
import { removeData } from '../../utils/storage';


const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logoutUser function from api.js
      await removeData('user'); // Remove user data from AsyncStorage
      dispatch(logoutUserAction()); // Dispatch the logoutUserAction
      navigation.navigate('Login'); // Navigate to the Login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;
