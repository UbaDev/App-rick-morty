import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { updateController } from '../../utils/api/updateUser';
import Toast from 'react-native-toast-message';

const ChangePass = () => {
  const { user, upDateUser } = useAuth();
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required('La contraseña actual es requerida'),
    password: yup.string().required('La nueva contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmNewPassword: yup.string()
      .required('Confirmación de la nueva contraseña requerida')
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          password: values.password,
        };
        const userId = user.id;

        const response = await updateController.update(formData, userId); 

        upDateUser('password', values.password);

        navigation.goBack();
        Alert.alert('Contraseña actualizada', 'La contraseña se actualizó correctamente');
        console.log('Valores enviados:', response);
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
      <View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Ingresa tu contraseña actual y la nueva contraseña</Text>

          <TextInput
            label="Contraseña actual"
            value={formik.values.currentPassword}
            onChangeText={formik.handleChange('currentPassword')}
            onBlur={formik.handleBlur('currentPassword')}
            secureTextEntry
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <Text style={{ color: 'red' }}>{formik.errors.currentPassword}</Text>
          )}
        </View>

        <View style={{marginBottom: 20}}>

          <TextInput
            label="Nueva contraseña"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
          )}
        </View>
       

        <TextInput
          label="Confirmar nueva contraseña"
          value={formik.values.confirmNewPassword}
          onChangeText={formik.handleChange('confirmNewPassword')}
          onBlur={formik.handleBlur('confirmNewPassword')}
          secureTextEntry
        />
        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
          <Text style={{ color: 'red' }}>{formik.errors.confirmNewPassword}</Text>
        )}

        <Button style={{ marginTop: 20 }} icon="send" mode="contained" onPress={formik.handleSubmit} disabled={!formik.isValid}>
          Actualizar contraseña
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePass;
