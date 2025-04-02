import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGuestPress = () => {
    Snackbar.show({
      text: 'Continuing as guest',
      duration: Snackbar.LENGTH_SHORT,
    });
    // Add your guest navigation logic here
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      blurRadius={Platform.OS === 'ios' ? 4 : 2}>
      <StatusBar barStyle="light-content" backgroundColor={'#130016'} />

      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        {/* <StatusBar backgroundColor="#4A90E2" barStyle="light-content" /> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.appName}>FinBook</Text>
            <Text style={styles.subtitle}>Your personal companion</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, styles.registerButtonText]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.footer} onPress={handleGuestPress}>
            <Text style={styles.footerText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 50,
    paddingBottom: 70,
  },
  header: {
    marginTop: height * 0.15,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 5,
  },
  appName: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '300',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  loginButtonText: {
    color: 'white',
  },
  registerButtonText: {
    color: '#4A90E2',
  },
  footer: {
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
