import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from './RegisterForm.styles'
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '../../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../../utils/api/auth';

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
      repeatPassword: Yup.string().required(true),
      repeatPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required(true)
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      const { email, username, password } = formData;
      try {
        await authApi.register(email, username, password);
        formik.values.email = "";
        formik.values.username = "";
        formik.values.password = "";
        formik.values.repeatPassword = "";
        Alert.alert("Registro exitoso", "Se ha registrado correctamente. Por favor, inicie sesión.");
        
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Hubo un problema durante el registro. Por favor, inténtelo de nuevo más tarde.");
      }
    }
  })


  return (
    <View >
      <TextInput
        label="Nombre de usuario"
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />

      <TextInput
        label="Correo electronico"
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <TextInput
        label="Contraseña"
        secureTextEntry={true}
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />

       <TextInput
        label="Repetir contraseña"
        secureTextEntry={true}
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      /> 
      <Button 
       mode="contained" 
       style={globalStyles.buttonText}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}>
        Registrarse
        
       </Button>
    </View>
  )
}