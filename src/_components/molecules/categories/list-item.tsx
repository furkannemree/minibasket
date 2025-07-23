import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../atoms/text';
import { AllCategoryResponseModel } from '../../../_actions/product/types';

interface ICategoriesListItemProps {
  item: AllCategoryResponseModel;
  onPress?: () => void;
}

const CategoriesListItem: React.FC<ICategoriesListItemProps> = ({
  item,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress && onPress}
      {...props}
    >
      <Text style={styles.text}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: {
    color: '#111',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default CategoriesListItem;
