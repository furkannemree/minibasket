import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductModel } from '../_actions/product/types';
import Toast from 'react-native-toast-message';

interface CartContextType {
  items: ProductModel[];
  addToCart: (product: ProductModel) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ProductModel[]>([]);

  const addToCart = (product: ProductModel) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === product.id);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Product added to cart',
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Product removed from cart',
    });
  };

  const increaseQuantity = (id: number) =>
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );

  const decreaseQuantity = (id: number) =>
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0),
    );

  const clearCart = () => {
    setItems([]);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Your cart has been cleared',
    });
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
