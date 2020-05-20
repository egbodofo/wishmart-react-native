import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../App';
import Colors from '../../constants/Colors';

const ProductDetailScreen = (props: {
  navigation: { navigate: (arg0: string, arg1: { id: any }) => void };
}) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.products.showProduct
  );

  const editProductHandler = (id: any) => {
    props.navigation.navigate('Edit Product', { id });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: selectedProduct.image }} />
        <View style={styles.nameWrapper}>
          <Text style={styles.nameBrand}>{selectedProduct.name}</Text>
          <Text style={styles.nameBrand}>{selectedProduct.brand}</Text>
        </View>
        {/* <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {}}
          />
        </View> */}
        <View style={styles.nameWrapper}>
          <Button
            color="#5FCA53"
            title="Edit Product"
            onPress={() => {
              editProductHandler(selectedProduct._id);
            }}
          />
          <Button color={Colors.primary} title="To Cart" onPress={() => {}} />
          <Button color={Colors.accent} title="Delete" onPress={() => {}} />
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginHorizontal: 20,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  nameBrand: {
    fontFamily: 'open-sans-bold',
  },
});

export default ProductDetailScreen;
