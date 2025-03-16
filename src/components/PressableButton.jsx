import React, {useRef} from 'react';
import {Pressable, Text, Animated} from 'react-native';
import styles from '../styles/compStyles/PressableButtonStyles';

const PressableButton = ({
  title,
  onPress,
  backgroundColor = '#007bff',
  textColor = '#fff',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, {backgroundColor}]}>
        <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default PressableButton;
