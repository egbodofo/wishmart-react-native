import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

type NavProps = {
  navigation: { navigate: (arg0: string) => void };
};

export interface IntProducts {
  name: string;
  brand: string;
  owner: string;
  price: number;
  description: string;
  image: string;
  _id: string;
}

const ProductsScreen = (props: NavProps) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = async () => {
      try {
        await dispatch(productsActions.fetchProducts());
      } catch (err) {
        console.log(err);
      }
    };
    fecthData();
  }, [dispatch]);

  const showProductHandler = async (id: any) => {
    let action;
    action = productsActions.fetchProductById(id);

    try {
      await dispatch(action);
      props.navigation.navigate('Product Details');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.image}
          name={itemData.item.name}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => showProductHandler(itemData.item._id)}
          />
          <Button color={Colors.accent} title="To Cart" onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

export default ProductsScreen;
