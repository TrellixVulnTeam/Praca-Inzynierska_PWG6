import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
export const storeLoginData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@loginData', jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const getLoginData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@loginData')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}