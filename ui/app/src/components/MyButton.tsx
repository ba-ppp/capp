import React from 'react';
import {Pressable, View} from 'react-native';
import {color} from '../constants/color';

interface Props {
  children: any;
  onPress: () => void;
  width: number | string;
}

const MyButton = ({children, onPress, width}: Props) => {
  return (
    <Pressable
      style={{
        backgroundColor: color.violetBlue,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default MyButton;
