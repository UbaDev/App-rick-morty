

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function SettingsScreen() {
  const [favoritess, setFavorites] = useState([]); 
  const { user, favorites, removeFromFavorites } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFavorites(favorites);
    }
  }, [favorites]);

  const removeFavorite = (id) => {
    removeFromFavorites(id)
      .then(() => {
        Alert.alert('Personaje eliminado de favoritos correctamente');
      })
      .catch((error) => {
        console.log("Error al eliminar el favorito: ", error);
        Alert.alert('Error', 'No se pudo eliminar el favorito.');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View
        style={{
          backgroundColor: '#81D4FA',
          width: '80%',
          marginVertical: 5,
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Image style={{ width: 60, height: 60, borderRadius: 8 }} source={{ uri: item.image }} />
        </View>
      </View>

      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <FontAwesome name="trash" size={60} color="red" />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Favoritos</Text>
      {favoritess.length === 0 ? (
        <Text>No hay favoritos</Text>
      ) : (
        <FlatList data={favoritess} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  removeButton: {
    color: 'red',
  },
});
