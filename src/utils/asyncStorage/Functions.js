/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN, USER, USERLOGIN} from './Constants';

export const _setDataToAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('error', error);
  }
};

export const _setDataObjectToAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('error', error);
  }
};

export const getValueIntoAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    // Error retrieving data
    return null;
  }
};

export const getTokenAndSetIntoHeaders = async token => {
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;

    // axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    let accessToken = await getValueIntoLocalStorage(TOKEN);
    console.log(
      '🚀 ~ file: Functions.js ~ line 35 ~ getTokenAndSetIntoHeaders ~ accessToken',
      accessToken,
    );

    if (accessToken) {
      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      // axios.defaults.headers.common['Authorization'] = `${accessToken}`;
    }
  }
};

export const removeUserDetail = async () => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USERLOGIN);
  await AsyncStorage.removeItem(USER);
};

export const getValueIntoLocalStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    // Error retrieving data
    return null;
  }
};

export const getToken = async value => {
  let token;

  if (value) {
    token = value;
  } else {
    token = await getValueIntoLocalStorage(TOKEN);
  }

  if (token !== null) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    return token;
  } else {
    return null;
  }
};
