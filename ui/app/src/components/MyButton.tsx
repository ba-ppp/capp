import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { color } from '../constants/color';

interface Props {
  children: any;
  onPress: () => void;
  width: number | string;
}

const MyButton = ({ children, onPress, width }: Props) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color.violetBlue,
      height: 30,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
    },
  });
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default MyButton;
