import React from 'react';
import {View, StyleSheet} from 'react-native';
import NetworkStatusChecker from './NetworkStatusChecker';

const ScreenWrapper = ({children}) => {
  return (
    <View style={styles.container}>
      <NetworkStatusChecker /> {/* Always below App Bar */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
