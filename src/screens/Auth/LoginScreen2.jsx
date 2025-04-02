import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import AuthService from '../../services/authService';

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginScreen2 = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    try {
      const response = await AuthService.login(data);
      console.log('response', response);
      if (response.status === 200) {
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.type === 'network') {
        Snackbar.show({
          text: error.message || 'Network error',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FF6B6B',
        });
        return;
      }
      console.log('Login failed:', error);
      Snackbar.show({
        text: error.message || 'Login failed',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF6B6B',
      });
    }
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient
      colors={['#4A90E2', '#6A5ACD']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/lock.png')}
              style={styles.logo}
            />
            <Text style={styles.appName}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Password"
                    placeholderTextColor="#A9A9A9"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#4A90E2" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#FFF',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 12,
  },
  forgotPassword: {
    color: '#FFF',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  signUpLink: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen2;
