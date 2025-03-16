import React from 'react';
import {View, Text, Linking, Pressable} from 'react-native';
import useNetworkStore from '../store/networkStore';
import styles from '../styles/compStyles/NetworkStatusCheckerStyles';

const NetworkStatusChecker = () => {
  const isConnected = useNetworkStore(state => state.isConnected);

  return (
    !isConnected && (
      <View style={styles.container}>
        <Text style={styles.messageText}>No Internet.</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.sendIntent('android.settings.WIFI_SETTINGS')
            }>
            <Text style={styles.buttonText}>Wifi Settings</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.sendIntent('android.settings.DATA_ROAMING_SETTINGS')
            }>
            <Text style={styles.buttonText}>Data Settings</Text>
          </Pressable>
        </View>
      </View>
    )
  );
};

export default NetworkStatusChecker;
