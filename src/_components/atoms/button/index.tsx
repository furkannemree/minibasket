import React from 'react';
import {
  TouchableOpacity as _TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from '../text';

interface IButtonComponentProps extends TouchableOpacityProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  label: string;
}

const Button: React.FC<IButtonComponentProps> = ({
  style,
  textStyle,
  label,
  ...props
}) => {
  return (
    <_TouchableOpacity style={{ ...styles.defaultStyle, ...style }} {...props}>
      <Text style={{ ...styles.textDefaultStyle, ...textStyle }}>{label}</Text>
    </_TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: '#FF5500',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefaultStyle: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: -0.5,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default Button;
