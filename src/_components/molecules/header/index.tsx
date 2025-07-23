import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../atoms/text';
import { ShoppingCart } from 'lucide-react-native';
import { useCart } from '../../../store/cartContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import general from '../../../utils/general';

const Header: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const { totalItems } = useCart();
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.text}>Search Products...</Text>
      </View>
      <TouchableOpacity style={styles.basket} onPress={()=> navigation.push('CartScreen')}>
        {!general.isNullOrEmpty(totalItems) && totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
        <ShoppingCart color="#FF5500" size={20} />
      </TouchableOpacity>
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
  search: {
    height: 40,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 8,
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
    marginLeft: 8,
  },
  text: {
    color: '#718096',
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 0.2,
  },
});

export default Header;
