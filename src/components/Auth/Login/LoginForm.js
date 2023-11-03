import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './LoginForm.styles';
import { globalStyles } from '../../../styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button, Modal, Portal, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { authApi2 } from '../../../utils/api/login';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../hooks/useAuth';
import { userController } from '../../../utils/api/users';

export default function LoginForm(props, ref) {
  
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'transparent', padding: 20, borderRadius: 10, height: 150, width: 150 };
  const { login } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const result = await userController.getMe();
      console.log('Resultado de getMe:', result);
    }

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Ingresa un correo válido').required('El correo es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres')
    }),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const { email, password } = formData;
        const response = await authApi2.login(email, password)
        showModal()
        setTimeout(() => {
          login(response.jwt);
        }, 2500);
         
        
      } catch (error) {
        console.log('Error en el inicio de sesión', error);
        showModal()

        setTimeout(() => {
          hideModal();
          Alert.alert('Error', 'Correo o contraseña incorrectos');
        }, 2000);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <View>
    
      <TextInput
        label="Correo electrónico"
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <TextInput
        label="Contraseña"
        style={globalStyles.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue('password', text)}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Button
        mode="contained"
        style={globalStyles.buttonText}
        onPress={formik.handleSubmit}>
        Iniciar sesión
      </Button>      


      <Portal>
        <Modal style={{
          justifyContent: 'center',
          alignItems: 'center',
         
        }} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ActivityIndicator animating={true} size="large" color="#81D4FA" />
        </Modal>
      </Portal>

    </View>
  );
}


