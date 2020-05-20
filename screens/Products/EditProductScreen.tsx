import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = (props: any) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.products.showProduct
  );

  const [formData, setFormData] = useState({
    name: selectedProduct.name,
    brand: selectedProduct.brand,
    price: selectedProduct.price.toString(),
    image: selectedProduct.image,
    description: selectedProduct.description,
  });

  const { name, brand, price, image, description } = formData;

  const handleInputChange = (inputName: any, inputValue: any) =>
    setFormData({ ...formData, [inputName]: inputValue });
  const dispatch = useDispatch();

  const submitHandler = async (id: any) => {
    let action;
    action = productsActions.updateProduct(id, {
      name,
      brand,
      price,
      image,
      description,
    });

    try {
      await dispatch(action);
      props.navigation.navigate('Product Details', { id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Name"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          value={name}
          onChangeText={(value: any) => handleInputChange('name', value)}
        />
        <Input
          label="Brand"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          value={brand}
          onChangeText={(value: any) => handleInputChange('brand', value)}
        />
        <Input
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          value={price}
          onChangeText={(value: any) => handleInputChange('price', value)}
        />
        <Input
          label="Image Url"
          keyboardType="default"
          returnKeyType="next"
          required
          value={image}
          onChangeText={(value: any) => handleInputChange('image', value)}
        />
        <Input
          label="Description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          required
          value={description}
          onChangeText={(value: any) => handleInputChange('description', value)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            color={Colors.accent}
            onPress={() => submitHandler(selectedProduct._id)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default EditProductScreen;
