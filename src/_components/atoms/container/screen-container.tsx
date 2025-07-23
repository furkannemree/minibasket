import React from 'react';
import {
  Text as _Text,
  StyleSheet,
  ViewStyle,
  View,
  ViewProps,
} from 'react-native';

interface IScreenContainerProps extends ViewProps {
  style?: ViewStyle;
}

const ScreenContainer: React.FC<IScreenContainerProps> = ({
  style,
  ...props
}) => {
  return (
    <View style={{ ...styles.defaultStyle, ...style }} {...props}>
      {props?.children}
    </View>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default ScreenContainer;
