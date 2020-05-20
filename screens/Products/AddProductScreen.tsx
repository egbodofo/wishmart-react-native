import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';

// import { NavigateProps } from '../../utils';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

type NavigateProps = {
  navigation: {
    navigate: (arg0: string) => void;
  };
};

const AddProductScreen = (props: NavigateProps) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    description: '',
  });

  const { name, brand, price, image, description } = formData;

  const handleInputChange = (inputName: any, inputValue: any) =>
    setFormData({ ...formData, [inputName]: inputValue });
  const dispatch = useDispatch();

  const submitHandler = async () => {
    let action;
    action = productsActions.createProduct({
      name,
      brand,
      price,
      image,
      description,
    });

    try {
      await dispatch(action);
      props.navigation.navigate('Home');
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
          onChangeText={(value: any) => handleInputChange('name', value)}
        />
        <Input
          label="Brand"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          onChangeText={(value: any) => handleInputChange('brand', value)}
        />
        <Input
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          min={0.1}
          onChangeText={(value: any) => handleInputChange('price', value)}
        />
        <Input
          label="Image Url"
          keyboardType="default"
          returnKeyType="next"
          required
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
          onChangeText={(value: any) => handleInputChange('description', value)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            color={Colors.accent}
            onPress={submitHandler}
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

export default AddProductScreen;
