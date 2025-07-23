import React from 'react';
import ProductModule from '../../_components/organisms/product';
import CategoryModule from '../../_components/organisms/categories';
import ScreenContainer from '../../_components/atoms/container/screen-container';
import Header from '../../_components/molecules/header';

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <Header />
      <CategoryModule />
      <ProductModule label="Popular Products" />
    </ScreenContainer>
  );
};

export default HomeScreen;
