import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../atoms/text';
import Button from '../../atoms/button';
import { ProductModel } from '../../../_actions/product/types';

interface IProductListItemProps {
  item: ProductModel;
  onPress?: () => void;
  addCart?: () => void;
}

const ProductListItem: React.FC<IProductListItemProps> = ({
  item,
  onPress,
  addCart,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress && onPress}
      {...props}
    >
      <View style={styles.discount}>
        <Text style={styles.discountText}>
          - %{Math.round(item.discountPercentage)}
        </Text>
      </View>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.rate}>{item.sku}</Text>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.butonContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Button
          label="Add to Card"
          style={styles.button}
          textStyle={styles.detailButton}
          onPress={addCart}
        ></Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  discount: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'absolute',
    top: 8,
    left: 8,
  },
  discountText: {
    color: '#FF5500',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    height: 100,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    paddingHorizontal: 8,
    color: '#222222',
    marginTop: 0,
    textAlign: 'center',
    height: 40,
  },
  butonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  button: {
    height: 32,
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Ubuntu-Bold',
    paddingHorizontal: 8,
    marginVertical: 4,
    alignSelf: 'flex-end',
  },
  rate: {
    fontSize: 10,
    color: '#9B9B9B',
    paddingHorizontal: 8,
    fontWeight: '400',
    lineHeight: 10,
    textAlign: 'center',
  },
  detailButton: {
    paddingHorizontal: 4,
  },
});

export default ProductListItem;
