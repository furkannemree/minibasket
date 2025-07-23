import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../../atoms/text';
import {
  ProductModel,
  ProductsResponseModel,
} from '../../../_actions/product/types';
import { GetProducts } from '../../../_actions/product';
import ProductListItem from '../../molecules/products/list-item';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../../../store/cartContext';
import Toast from 'react-native-toast-message';

interface IProductModuleProps {
  label?: string;
}

const ProductModule: React.FC<IProductModuleProps> = ({ label }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      await GetProducts()
        .then(async (data: ProductsResponseModel) => {
          setProducts(data.products);
        })
        .catch((e: any) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Products could not be loaded, please try again.',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Ürün alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: ProductModel }) => {
    return (
      <ProductListItem
        item={item}
        onPress={() =>
          navigation.push('ProductDetail', { productId: item?.id })
        }
        addCart={() => addToCart(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF5500"
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              <Image
                source={require('../../../assets/images/Banner.png')}
                style={{ height: 170, width: '100%' }}
                resizeMode="contain"
              />
              {label && <Text style={styles.label}>{label}</Text>}
            </>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    letterSpacing: 0,
    marginVertical: 4,
    marginBottom: 8,
  },
});

export default ProductModule;
