import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Text from '../../atoms/text';
import { ChevronLeft, ShoppingCart, Trash } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../../store/cartContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import general from '../../../utils/general';

interface IStackHeaderProps extends ViewProps {
  label?: string;
  isBasket?: boolean;
  isClear?: boolean;
}

const StackHeader: React.FC<IStackHeaderProps> = ({
  label,
  isBasket = false,
  isClear = false,
  ...props
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { totalItems, clearCart } = useCart();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.basket}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft color="#FF5500" size={20} />
      </TouchableOpacity>
      <View style={styles.label}>
        {label && (
          <Text style={styles.text} numberOfLines={1}>
            {label}
          </Text>
        )}
      </View>
      {isClear && (
        <TouchableOpacity style={styles.basket} onPress={clearCart}>
          <Trash color="#FF5500" size={20} />
        </TouchableOpacity>
      )}
      {isBasket && (
        <TouchableOpacity
          style={styles.basket}
          onPress={() => navigation.push('CartScreen')}
        >
          {!general.isNullOrEmpty(totalItems) && totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
          <ShoppingCart color="#FF5500" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  badge: {
    width: 16,
    height: 16,
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: '#FF5500',
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
    right: -4,
    zIndex: 9999,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
  },
  basket: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#111',
    fontFamily: 'Ubuntu-Medium',
    letterSpacing: 0,
  },
});

export default StackHeader;
