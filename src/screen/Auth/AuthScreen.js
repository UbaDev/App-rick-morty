import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Fonts from '../../constants/Fonts'
import LoginForm from '../../components/Auth/Login/LoginForm';
import RegisterForm from '../../components/Auth/Register/RegisterForm';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
 
  const changeForm = () => {
    setIsLogin(!isLogin);
  }

  return (
    <View style={styles.container}>
    <View style={{height: "40%"}}>
        <Image source={require("../../../assets/fondoRick.jpg")} style={{ width: "100%", height: "100%", borderRadius: 40 }} />
    </View>
    <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding" : "height"}>
      <View style={{height: "60%"}}>
          <Text style={{ fontFamily: Fonts.family.bold, fontSize: Fonts.size.large, marginVertical: 20, textAlign: "center" }}>{isLogin ? "Iniciar sesión" : "Registrarse"}</Text>

          <View style={{ marginHorizontal: 35 }}>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Text style={{ fontFamily: Fonts.family.bold, fontSize: Fonts.size.medium, marginVertical: 20 }} onPress={changeForm}>{isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}</Text>

          </View>
      </View>
       
       
    </KeyboardAvoidingView>
    </View>
  )
}

  const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center"
  } 
}) 