import AsyncStorage from '@react-native-async-storage/async-storage';

export const load = async (key: any) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}

export const save = async (key: any, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}