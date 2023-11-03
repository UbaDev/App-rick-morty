import { View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './TabNavigation.styles'
import CharacterDetail from '../../screen/CharacterDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../screen/HomeScreen';
import RickAndMortyAxios from "../../utils/api/RickAndMortyAxios"
import FavoritesScreen from '../../screen/FavoritesScreen';
import AccountScreen from '../../screen/AccountScreen';
import SettingsScreen from '../../screen/SettingsScreen';
import CharacterDetailScreen from '../../screen/CharacterDetailScreen';
import ChangeEmail from '../../screen/Account/ChangeEmail';
import ChangeName from '../../screen/Account/ChangeName';
import ChangePass from '../../screen/Account/ChangePass';
import ChangeUser from '../../screen/Account/ChangeUser';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const CharacterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={RickAndMortyAxios} options={{
        title: 'Inicio',
        headerShown: false,
      }} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} 
        options={{
          title: 'Detalle del personaje'
        }} />
    </Stack.Navigator>
  );
};

const AccountsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{
        title: 'Cuenta',
        headerShown: false,
      }} />

      <Stack.Screen name="Pass" component={ChangeEmail} options={{
        title: 'Cambiar email',
      }} />

      <Stack.Screen name="Email" component={ChangePass} options={{
        title: 'Cambiar contraseña',
      }} />


      <Stack.Screen name="User" component={ChangeUser} options={{
        title: 'Cambiar usuario',
      }} />

      <Stack.Screen name="Name" component={ChangeName} options={{
        title: 'Cambiar nombre',
      }} /> 
    </Stack.Navigator>
  );
}


export default function TabNavigation() {
  return (

    

    <Tab.Navigator 
     screenOptions={({ route }) => ({
      tabBarIcon: (routeStatus) => setIcon(route, routeStatus)
      })}
      >
     
      <Tab.Screen
        name="Cuenta"
        component={AccountsStack}
        options={{
          title: 'Cuenta',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={CharacterStack}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../../assets/rick.png')}
              style={{ width: 80, height: 80}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: 'Favoritos'
        }}
      />
    </Tab.Navigator>
  );
}

const setIcon = (route, routeStatus) => {
  let iconName = '';
  let color = '#ccc';
  if (routeStatus.focused) {
    color = '#81D4FA';
    }

    if(route.name === "Inicio"){
      iconName="filter"
    }
    if(route.name === "Cuenta"){
      iconName="user"
    }
    if(route.name === "Config"){
      iconName="heart"
    }
    if(route.name === "Fav"){
      iconName="futbol"
    }
return <AwesomeIcon name={iconName} color={color} style={styles.icon}/>
}
