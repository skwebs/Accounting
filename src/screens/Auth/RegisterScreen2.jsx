import React, {useState} from 'react';
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
// import Icon from 'react-native-vector-icons/MaterialIcons';

// Define validation schema with Zod
const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const RegisterScreen2 = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async data => {
    try {
      const response = await AuthService.register(data);
      console.log('response', response);
      if (response.status === 201) {
        Snackbar.show({
          text: 'Registration successful! Please login.',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#4CAF50',
        });
        navigation.navigate('Login');
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
      console.log('Registration failed:', error);
      Snackbar.show({
        text: error.message || 'Registration failed',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF6B6B',
      });
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
            <Text style={styles.appName}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Name Input */}
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Full Name"
                    placeholderTextColor="#A9A9A9"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  )}
                </View>
              )}
            />

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

            {/* Password Input with Toggle */}
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        errors.password && styles.inputError,
                      ]}
                      placeholder="Password"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={toggleShowPassword}>
                      {/* <Icon
                        name={showPassword ? 'visibility-off' : 'visibility'}
                        size={24}
                        color="#A9A9A9"
                      /> */}
                      <Text>{showPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Confirm Password Input with Toggle */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        errors.confirmPassword && styles.inputError,
                      ]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={toggleShowConfirmPassword}>
                      {/* <Icon
                        name={
                          showConfirmPassword ? 'visibility-off' : 'visibility'
                        }
                        size={24}
                        color="#A9A9A9"
                      /> */}
                      <Text>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#4A90E2" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Login</Text>
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
    fontSize: 16,
    color: '#333',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingRight: 15,
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
  registerButton: {
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
  registerButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loginLink: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen2;
