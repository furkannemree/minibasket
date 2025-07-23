import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from '../../atoms/text';
import { AllCategoryResponseModel } from '../../../_actions/product/types';
import { GetAllCategories } from '../../../_actions/product';
import CategoriesListItem from '../../molecules/categories/list-item';
import Toast from 'react-native-toast-message';

interface ICategoryModuleProps {
  label?: string;
}

const CategoryModule: React.FC<ICategoryModuleProps> = ({ label }) => {
  const [categories, setCategories] = useState<AllCategoryResponseModel[]>([]);

  const fetchCategories = async () => {
    try {
      await GetAllCategories()
        .then(async (data: AllCategoryResponseModel[]) => {
          setCategories([
            {
              slug: 'all',
              name: 'All',
              url: 'https://dummyjson.com/products/category/all',
            },
            ...data,
          ]);
        })
        .catch((e: any) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Categories could not be loaded, please try again.',
          });
        });
    } catch (error) {
      console.error('Kategori alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item }: { item: AllCategoryResponseModel }) => {
    return <CategoriesListItem item={item} />;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8, gap: 8 }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  label: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    marginTop: 8,
    letterSpacing: 0,
  },
});

export default CategoryModule;
