import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Card({ characters }) {
  const navigation = useNavigation();
  const goToPersonaje = (selectedCharacter) => {
    console.log('Personaje seleccionado:', selectedCharacter); 
    navigation.navigate('CharacterDetail', { character: selectedCharacter });
  };

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: '#81D4FA',
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
      onPress={() => goToPersonaje(characters)}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>{characters.name}</Text>
        <Image
          style={{ width: 60, height: 60, borderRadius: 8 }}
          source={{ uri: characters.image }}
        />
      </View>
    </TouchableOpacity>
  );
}
