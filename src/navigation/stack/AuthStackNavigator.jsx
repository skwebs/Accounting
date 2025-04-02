import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import LoginScreen2 from '../../screens/Auth/LoginScreen2';
import RegisterScreen2 from '../../screens/Auth/RegisterScreen2';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen2}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen2}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
