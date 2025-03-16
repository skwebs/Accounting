import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/compStyles/LoadingStyles';

const Loading = ({text = ''}) => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="50" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );
};

export default Loading;
