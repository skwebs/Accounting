// export default BottomTabNavigator;
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeTab from './tabs/HomeTab';
import Colors from '../../styles/theme/Colors';
import SettingsTab from './tabs/SettingsTab';

const Bottom = createBottomTabNavigator();

const TabIcon = ({size, color, focused, img}) => {
  return (
    <Image source={img} style={{width: size, height: size, tintColor: color}} />
  );
};

const BottomTabNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        // if you want to change the active tab color
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        // if you want to change the active label color
        // tabBarActiveBackgroundColor: '#008080',
        // tabBarInactiveBackgroundColor: 'white',
        // tabBarActiveTintColor: 'white',
        // tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeTab}
        options={{
          // headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            TabIcon({
              size,
              color,
              focused,
              img: require('../../assets/images/home64.png'),
            }),
        }}
      />
      <Bottom.Screen
        name="Settings"
        component={SettingsTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            TabIcon({
              size,
              color,
              focused,
              img: require('../../assets/images/settings64.png'),
            }),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomTabNavigator;
