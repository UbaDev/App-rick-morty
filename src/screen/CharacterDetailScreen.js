import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';


export default function CharacterDetail({route}) {
  const navigation = useNavigation();
  const character = route.params.character;
  const [isLongPressed, setIsLongPressed] = useState(false);
  const { user, addFavorite, favorites } = useContext(AuthContext)

  const isCharacterInFavorites = favorites.some(favCharacter => favCharacter.id === character.id); // Verifica si el personaje ya está en favoritos


  const handleAddToFavorites = () => {
    if (user) {
      if (isCharacterInFavorites) {
        Alert.alert('Ya está en favoritos', 'Este personaje ya está en tu lista de favoritos');
      } else {
        addFavorite(character);
        Alert.alert('Agregado a favoritos');
      }
    } else {
      Alert.alert('Debes iniciar sesión para agregar a favoritos');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.moonShape} />
        <Image
          style={styles.characterImage}
          source={{ uri: character.image }}
        />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.characterName}>{character.name}</Text>
        
        <View style={styles.container2}>
          <TouchableOpacity
            style={[
              styles.button,
              isLongPressed && { borderWidth: 6, borderColor: 'red' },
            ]}
            onLongPress={handleAddToFavorites}
            onPressOut={() => setIsLongPressed(false)}
          >
            <Image
              style={styles.image}
              source={{
                uri: 'https://i.pinimg.com/originals/c2/b4/cf/c2b4cfa2c85a298fe6a57d13f1b6ec74.png'
              }}
            />
            
            <View style={styles.heartIcon}>
              <FontAwesome name="heart" size={80} color="#fff" />
            </View>
          </TouchableOpacity>         
          
        </View>
        <Text style={{color: "gray", top: -10 }}>Mantén presionado para agregar a favoritos</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonShape: {
    width: 200,
    height: 330,
    backgroundColor: '#81D4FA',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  characterImage: {
    width: 250,
    height: 250,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
    
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  container2: {
    borderRadius: 75,
    overflow: 'hidden',
    marginVertical: 30
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#81C784',
    borderRadius: 75,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: 170,
    width: 170,
    marginVertical: 40,
    zIndex: -1,
    position: 'absolute',
  },
  heartIcon: {
    position: 'absolute',
    top: 40,
    left: 33,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    zIndex: 1,
  },
});
