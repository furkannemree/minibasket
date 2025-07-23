import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ScreenContainer from '../../_components/atoms/container/screen-container';
import StackHeader from '../../_components/molecules/header/stack-header';
import { GetProductDetail } from '../../_actions/product';
import { ProductModel } from '../../_actions/product/types';
import ProductImages from '../../_components/molecules/product-detail/images';
import { Star } from 'lucide-react-native';
import Button from '../../_components/atoms/button';
import { useCart } from '../../store/cartContext';

type RootStackParamList = {
  ProductDetail: { productId: number };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await GetProductDetail(productId)
          .then(async (data: ProductModel) => {
            setProduct(data);
          })
          .catch((e: any) => {
            console.log('e', e);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error('Ürün detayı alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#FF5500" />
      </View>
    );
  }

  if (!product) {
    return (
      <>
        <StackHeader isBasket />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
          }}
        >
          <Text>Product not found</Text>
        </View>
      </>
    );
  }

  return (
    <ScreenContainer>
      <StackHeader label={product?.title} isBasket />

      <ScrollView contentContainerStyle={styles.container}>
        <ProductImages images={product?.images} />
        <View style={styles.discount}>
          <Text style={styles.discountText}>
            - %{Math.round(product?.discountPercentage)}
          </Text>
        </View>
        <View style={styles.detailBox}>
          <View style={styles.row}>
            <View style={styles.rate}>
              <Star color={'#FF5500'} fill={'#FF5500'} size={16} />
              <Text style={styles.rateText}>({product?.rating})</Text>
            </View>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{product?.category}</Text>
            </View>
          </View>
          <View style={styles.rate}>
            <Text style={styles.brandText}>{product?.brand}</Text>
            <Text style={styles.title}>{product?.title}</Text>
          </View>
          <Text style={styles.description}>{product?.description}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}
          >
            <Text style={styles.priceText}>${product?.price}</Text>

            {product?.stock > 0 && (
              <Text style={styles.stockText}>Son {product?.stock} ürün</Text>
            )}
          </View>
        </View>

        <View style={{ padding: 16, marginBottom: 20 }}>
          <Button
            disabled={product?.stock == 0 || !product?.stock}
            label={product?.stock > 0 ? 'Add to Card' : 'Notify Me'}
            style={
              product?.stock == 0 || !product?.stock ? styles.butonReminder : {}
            }
            textStyle={
              product?.stock == 0 || !product?.stock
                ? styles.butonReminderText
                : {}
            }
            onPress={() => addToCart(product)}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  butonReminder: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  butonReminderText: {
    color: '#111',
    fontSize: 12,
    letterSpacing: -0.5,
    fontFamily: 'Ubuntu-Bold',
  },
  detailBox: {
    paddingHorizontal: 16,
    marginTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#111',
    fontFamily: 'Ubuntu-Medium',
  },
  description: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Ubuntu-Light',
    marginTop: 8,
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rateText: {
    fontSize: 12,
    color: '#111',
    fontFamily: 'Ubuntu-Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: '#FF5500',
    padding: 8,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },
  brandText: {
    fontSize: 16,
    color: ' rgba(255, 85, 0, .6)',
    fontFamily: 'Ubuntu-Medium',
  },
  discount: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'absolute',
    top: 8,
    left: 24,
  },
  discountText: {
    color: '#FF5500',
    fontSize: 12,
    fontWeight: '600',
  },
  priceText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600',
  },
  stockText: {
    fontSize: 14,
    color: ' rgba(255, 85, 0, 1)',
    fontFamily: 'Ubuntu-Medium',
  },
});
