import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  // const {navigation} = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Button title="Go to Post" onPress={() => navigation.navigate('Posts')} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
