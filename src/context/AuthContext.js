import React, { createContext, useState, useEffect, useCallback } from "react";
import { storageController } from "../utils/api/token";
import { userController } from "../utils/api/users";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenExpired } from "../utils/tokenExpired";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getSession();
    }, []);

    const login = async (token) => {
        try {
            await storageController.setToken(token);

            const response = await userController.getMe();
            setUser(response);
            setLoading(false);

            const userFavoritesKey = `favorites_${response.id}`;
            const storedFavorites = await AsyncStorage.getItem(userFavoritesKey);
            const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(favoritesArray);

            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.log("Error al guardar el token: ", error);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null);
            setFavorites([]); 
            setLoading(false);
            await AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.log("Error al eliminar el token: ", error);
            setLoading(false);
        }
    }

    const getSession = async () => {
        const token = await storageController.getToken();
        const storedToken = await AsyncStorage.getItem('userToken');

        if (storedToken) {
            await storageController.setToken(storedToken);
            const response = await userController.getMe();
            setUser(response);
        }

        if (!token) {
            logout();
            setLoading(false);
            return;
        }
        if (tokenExpired(token)) {
            logout();
        } else {
            login(token);
        }

        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(favoritesArray);
        } catch (error) {
        }

        setLoading(false);
    };

    const addFavorite = async (favorite) => {
        const updatedFavorites = [...favorites, favorite];
        setFavorites(updatedFavorites);

        const userFavoritesKey = `favorites_${user.id}`;
        await AsyncStorage.setItem(userFavoritesKey, JSON.stringify(updatedFavorites));
    }


    const removeFromFavorites = (id) => {
        return new Promise((resolve, reject) => {
            const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
            setFavorites(updatedFavorites);

            const userFavoritesKey = `favorites_${user.id}`;
            AsyncStorage.setItem(userFavoritesKey, JSON.stringify(updatedFavorites))
                .then(() => {
                    resolve(); // Resuelve la promesa si la operación se realiza con éxito
                })
                .catch((error) => {
                    reject(error); // Rechaza la promesa si hay un error
                });
        });
    };


    const upDateUser = useCallback((key, value) => {
        setUser((prevUser) => ({...prevUser, [key]: value}))
    }, [setUser]);

    const data = {
        user,
        favorites, 
        login,
        removeFromFavorites,
        logout,
        addFavorite, 
        upDateUser,
    }

    if (loading) return null;

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
