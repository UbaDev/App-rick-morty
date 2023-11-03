import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/components/navigation/AppNavigation";
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat"
import RootNavigation from "./src/components/navigation/RootNavigation";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthProvider } from "./src/context/AuthContext";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#57A905',
    secondary: 'yellow',
  },
};

export default function App() {
  const [fontLoaded, fontError] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_700Bold
  });

  if (!fontLoaded && !fontError) return null;

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Toast />
        <RootNavigation />
      </PaperProvider>
    </AuthProvider>


  );
}


