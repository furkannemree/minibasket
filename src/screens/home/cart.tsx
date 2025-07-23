import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import ScreenContainer from '../../_components/atoms/container/screen-container';
import StackHeader from '../../_components/molecules/header/stack-header';
import { useCart } from '../../store/cartContext';
import { ProductModel } from '../../_actions/product/types';
import CartListItem from '../../_components/molecules/cart/list-item';
import Button from '../../_components/atoms/button';

export default function CartScreen() {
  const { items, totalPrice } = useCart();

  const renderItem = ({ item }: { item: ProductModel }) => {
    return <CartListItem item={item} />;
  };

  return (
    <ScreenContainer>
      <StackHeader label="My Cart" isClear />
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        <Button style={styles.button} label="Payment" />
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  button: { paddingHorizontal: 16 },
});
