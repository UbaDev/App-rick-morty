import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from '../TabNavigation/TabNavigation'


export default function AppNavigation() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='TabNavigation'
        component={TabNavigation}
        options={{
          headerShown:false
        }}/>   
      </Stack.Navigator>
    </NavigationContainer>
  )
}