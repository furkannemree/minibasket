import React from 'react';
import { Text as _Text, StyleSheet, TextProps, TextStyle } from 'react-native';

interface ITextComponentProps extends TextProps {
  style?: TextStyle;
}

const Text: React.FC<ITextComponentProps> = ({ style, ...props }) => {
  return (
    <_Text
      allowFontScaling={false}
      style={{ ...styles.defaultStyle, ...style }}
      {...props}
    >
      {props?.children}
    </_Text>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 16,
    letterSpacing: -1,
    color:'#111'
  },
});

export default Text;
