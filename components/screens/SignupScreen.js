import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import CustomButton from '../common/CustomButton';
import colors from '../../styles/colors';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import { signupUser } from '../../services/api';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupPress = async () => {
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      Alert.alert('Please fill in all fields');
    } else {
      setIsLoading(true);
      try {
        const userData = { email, password, firstName, lastName };
        const response = await signupUser(userData);
        debugger
        const { user, token } = response.data;
        dispatch(setUser(user));
        await AsyncStorage.setItem('token', token);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert('Signup failed. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <CustomButton title="Sign up" onPress={handleSignupPress} />
      <Text style={styles.text}>
        Already have an account?
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login')}
        >
          {' '}
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.text,
  },
  linkText: {
    color: colors.link,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
