import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Touchable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Avatar, ActivityIndicator, MD2Colors, Card, Badge } from 'react-native-paper'
import { userController } from '../utils/api/users'
import { useAuth } from '../hooks/useAuth'
import { List, IconButton, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  const handleItemClick = (screenName) => {
    navigation.navigate(screenName);
  };

  handleSiPress = () => {
    console.log("Botón 'Sí' presionado");
  }

  showCustomAlert = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de cerrar sesión?',
      [
        {
          text: 'No',
          onPress: () => console.log("Botón 'No' presionado"),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: logout,
        },
      ],
      { cancelable: true }
    );
  }


  const items = [
    {
      title: 'Cambiar nombre y apellido',
      description: 'Cambiar nombre y apellido de tu cuenta',
      icon: 'account',
      screen: 'Name',
    },
    {
      title: 'Cambiar email',
      description: 'Cambiar email de tu cuenta',
      icon: 'email',
      screen: 'Pass',
    },
    {
      title: 'Cambiar nombre de usuario',
      description: 'Cambiar nombre de usuario de tu cuenta',
      icon: 'account-convert',
      screen: 'User',
    },

    {
      title: 'Cambiar contraseña',
      description: 'Cambiar contraseña de tu cuenta',
      icon: 'lastpass',
      screen: 'Email',
    },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Card style={{width: "100%"}}>
          <Card.Cover source={{ uri: 'https://picsum.photos/800' }} />          
        </Card>
        <Avatar.Image style={{ top: -50 }} size={140} source={{ uri: "https://c0.klipartz.com/pngpicture/348/118/gratis-png-rick-sanchez-rick-sanchez-morty-smith-dibujo-rick-y-morty.png"}} />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Bienvenido</Text>
        <Text style={{ fontSize: 24, marginVertical: 10 }}>{user.firstname && user.lastname ? user.firstname + " " +  user.lastname: user.email}</Text>
        <Button icon="account-arrow-left-outline" buttonColor='#81D4FA' mode="contained" onPress={showCustomAlert} >
          Cerrar sesión
        </Button>
      </View>

      <View style={styles.form}>
        <List.Section>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={item.title}
                description={item.description}
                left={() => <List.Icon color='#81D4FA' icon={item.icon} />}
                onPress={() => handleItemClick(item.screen)}
              />
              {index < items.length - 1 && <Divider style={{height: 1.3}} />}
            </React.Fragment>
          ))}
        </List.Section>
      </View>

      
        
     
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    padding: 10,
  },

  form: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  }
 
})