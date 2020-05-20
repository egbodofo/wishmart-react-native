import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { NavigateProps } from '../../utils';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const RegisterScreen = (props: NavigateProps) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    password: '',
  });

  const { firstname, lastname, email, telephone, password } = formData;

  const handleInputChange = (inputName: any, inputValue: any) =>
    setFormData({ ...formData, [inputName]: inputValue });

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    action = authActions.signup({
      firstname,
      lastname,
      email,
      telephone,
      password,
    });

    try {
      await dispatch(action);
      props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            label="First Name"
            keyboardType="default"
            required
            // value={firstname}
            onChangeText={(value: any) => handleInputChange('firstname', value)}
            defaultValue=""
          />
          <Input
            label="Last Name"
            keyboardType="default"
            required
            // value={lastname}
            onChangeText={(value: any) => handleInputChange('lastname', value)}
            defaultValue=""
          />
          <Input
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            // value={email}
            onChangeText={(value: any) => handleInputChange('email', value)}
            defaultValue=""
          />
          <Input
            label="Phone Number"
            keyboardType="numeric"
            required
            // value={telephone}
            onChangeText={(value: any) => handleInputChange('telephone', value)}
            defaultValue=""
          />
          <Input
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            // value={password}
            onChangeText={(value: any) => handleInputChange('password', value)}
            defaultValue=""
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              color={Colors.accent}
              onPress={authHandler}
            />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default RegisterScreen;
