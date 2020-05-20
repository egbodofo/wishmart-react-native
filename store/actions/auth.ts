import { AsyncStorage } from 'react-native';

import axios from '../../axios-order';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId: string, token: string) => {
  return (
    dispatch: (arg0: { type: string; userId: string; token: string }) => void
  ) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (userData: any) => {
  return async (dispatch: any) => {
    const response = await axios.post('/register', userData);

    const resData = await response;
    const user = resData.data.user;
    const isLoggedInId = user._id;

    dispatch(authenticate(isLoggedInId, resData.data.token));

    AsyncStorage.setItem('isLoggedInId', isLoggedInId);
    AsyncStorage.setItem('token', resData.data.token);
  };
};

export const login = (userData: any) => {
  return async (dispatch: any) => {
    const response = await axios.post('/login', userData);

    const resData = await response;
    const user = resData.data.user;
    const isLoggedInId = user._id;

    dispatch(authenticate(isLoggedInId, resData.data.token));

    AsyncStorage.setItem('isLoggedInId', isLoggedInId);
    AsyncStorage.setItem('token', resData.data.token);
  };
};
