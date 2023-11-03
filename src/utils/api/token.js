import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "../constants";

const setToken = async (token) => {
    await AsyncStorage.setItem(ENV.STORAGE.TOKEN, token);
}

const getToken = async () => {
    return await AsyncStorage.getItem(ENV.STORAGE.TOKEN);
}

const removeToken = async () => {
    await AsyncStorage.removeItem(ENV.STORAGE.TOKEN);
}

export const storageController = {
    setToken,
    getToken,
    removeToken,
}