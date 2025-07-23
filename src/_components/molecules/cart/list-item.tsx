import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../atoms/text';
import Button from '../../atoms/button';
import { ProductModel } from '../../../_actions/product/types';
import { useCart } from '../../../store/cartContext';
import { Trash2 } from 'lucide-react-native';

interface ICartListItemProps {
  item: ProductModel;
  onPress?: () => void;
  addCart?: () => void;
}

const CartListItem: React.FC<ICartListItemProps> = ({
  item,
  onPress,
  addCart,
  ...props
}) => {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  return (
    <View style={styles.card} {...props}>
      <View style={styles.product}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detail}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.box}>
            <TouchableOpacity
              style={{ paddingVertical: 5, paddingHorizontal: 8 }}
              onPress={() => decreaseQuantity(item.id)}
            >
              <Text style={styles.operator}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              style={{ paddingVertical: 5, paddingHorizontal: 8 }}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text style={styles.operator}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Trash2 color={'#FF5500'} size={20} />
        </TouchableOpacity>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
  },
  operator: {
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
    color: '#FF5500',
  },
  product: {
    flexDirection: 'row',
    flex: 1,
  },
  detail: {
    marginHorizontal: 8,
    flex: 1,
  },
  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Ubuntu-Medium',
    color: '#222222',
  },
  price: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Ubuntu-Bold',
  },
  quantity: {
    fontSize: 12,
    color: '#111',
  },
  quantityBox: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 85, 0, .3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default CartListItem;
