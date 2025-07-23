import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

interface IProductImagesProps extends ViewProps {
  images: Array<string>;
}
const { width } = Dimensions.get('window');

const ProductImages: React.FC<IProductImagesProps> = ({ images, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.imagebox}>
        <Image
          source={{ uri: item }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    );
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
      />
      <View style={styles.pagination}>
        {images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#FF5500' : '#E5E7EB',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  image: {
    height: 200,
    width: width - 64,
  },
  imagebox: {
    width: width - 32,
    height: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});

export default ProductImages;
