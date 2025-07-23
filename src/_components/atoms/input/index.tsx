import React from 'react';
import {
  TextInput as _TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';

interface ITextInputComponentProps extends TextInputProps {
  style?: TextStyle;
}

const TextInput: React.FC<ITextInputComponentProps> = ({ style, ...props }) => {
  return (
    <_TextInput
      allowFontScaling={false}
      style={{ ...styles.defaultStyle, ...style }}
      {...props}
    >
      {props?.children}
    </_TextInput>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 16,
  },
});

export default TextInput;
