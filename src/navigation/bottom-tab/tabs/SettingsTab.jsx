import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../styles/theme/Colors';

const SettingsTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Tab</Text>
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
