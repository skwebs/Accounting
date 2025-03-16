import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {API_BASE_URL} from '@env';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* <Text>BASE_URL: {process.env.API_URL}</Text> */}
        <Text>API_BASE_URL: {API_BASE_URL}</Text>
        <Button
          title="Go to Post"
          onPress={() => navigation.navigate('Posts')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    padding: 20,
    gap: 25,
  },
});
