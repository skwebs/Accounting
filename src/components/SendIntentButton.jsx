import {Alert, Button, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';

const SendIntentButton = ({action, extras, children}) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

export default SendIntentButton;

const styles = StyleSheet.create({});
