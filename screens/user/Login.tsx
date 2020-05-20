import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { NavigateProps } from '../../utils';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const LoginScreen = (props: NavigateProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleInputChange = (inputName: any, inputValue: any) =>
    setFormData({ ...formData, [inputName]: inputValue });

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    action = authActions.login({
      email,
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
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            onChangeText={(value: any) => handleInputChange('email', value)}
            defaultValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            autoCapitalize="none"
            onChangeText={(value: any) => handleInputChange('password', value)}
            defaultValue=""
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" color={Colors.accent} onPress={authHandler} />
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

export default LoginScreen;
