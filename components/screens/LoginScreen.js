import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../store/actions/userActions';
import { loginUser } from '../../services/api';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      dispatch(loginUserAction(user));
      navigation.navigate('Home'); // 
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./path/to/your/logo.png')}
        style={styles.logo}
      /> */}
      <CustomInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <CustomButton onPress={handleLogin} title="Sign In" />
      <Text style={styles.linkText} onPress={() => navigation.navigate('ForgotPasswordScreen')}>Forgot Password?</Text>
      <Text style={styles.linkText} onPress={() => navigation.navigate('RegisterScreen')}>Register</Text>
      <CustomButton title="Continue with Google" />
      <CustomButton title="Continue with Apple" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  linkText: {
    color: 'black',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
