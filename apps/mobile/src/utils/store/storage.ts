import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    console.log("Storing data:", value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(value);
    if (value == null) {
      console.log("No data found");
      return null;
    }
    return JSON.parse(value);
  } catch (e) {
    // error reading value
  }
};