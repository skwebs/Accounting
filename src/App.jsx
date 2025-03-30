// import React, {useEffect} from 'react';
// import {listenForNetworkChanges} from './store/networkStore';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {StatusBar} from 'react-native';
// import StackNavigator from './navigation/stack/StackNavigator';
// import BottomTabNavigator from './navigation/bottom-tab/BottomTabNavigator';

// const App = () => {
//   useEffect(() => {
//     listenForNetworkChanges(); // Start network status monitoring
//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
//       <SafeAreaProvider>
//         {/* <StackNavigator /> */}
//         <BottomTabNavigator />
//       </SafeAreaProvider>
//     </>
//   );
// };

// export default App;
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  listenForNetworkChanges,
  removeNetworkListener,
} from './store/networkStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import StackNavigator from './navigation/stack/StackNavigator';
import BottomTabNavigator from './navigation/bottom-tab/BottomTabNavigator';

const App = () => {
  useEffect(() => {
    listenForNetworkChanges(); // Start network status monitoring

    // Set StatusBar background color (Android-specific)
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
    }

    return () => {
      removeNetworkListener(); // Cleanup network listener
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        {/* Choose either StackNavigator or BottomTabNavigator, or conditionally render */}
        <BottomTabNavigator />
        {/* <StackNavigator /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
