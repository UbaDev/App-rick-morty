import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { updateController } from '../../utils/api/updateUser';
import Toast from 'react-native-toast-message';

const ChangeEmail = () => {
  const navigation = useNavigation();
  const { user, upDateUser } = useAuth();

  const validationSchema = yup.object().shape({
    currentEmail: yup.string().email('El correo actual no es válido').required('El correo actual es requerido'),
    newEmail: yup.string().email('El nuevo correo no es válido').required('El nuevo correo es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      currentEmail: user ? user.email : '',
      newEmail: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          email: values.newEmail,
        };
        const userId = user.id;

        const response = await updateController.update(formData, userId);
        upDateUser('email', values.newEmail);

        navigation.goBack();
        Alert.alert('Correo actualizado', 'El correo se actualizó correctamente');
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
          <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Ingresa el nuevo correo electrónico</Text>

          <TextInput
            label="Correo electrónico actual"
            value={formik.values.currentEmail}
            onChangeText={formik.handleChange('currentEmail')}
            onBlur={formik.handleBlur('currentEmail')}
            editable={false}
          />
          {formik.touched.currentEmail && formik.errors.currentEmail && (
            <Text style={{ color: 'red' }}>{formik.errors.currentEmail}</Text>
          )}
        </View>

        <TextInput
          label="Nuevo correo electrónico"
          value={formik.values.newEmail}
          onChangeText={formik.handleChange('newEmail')}
          onBlur={formik.handleBlur('newEmail')}
        />
        {formik.touched.newEmail && formik.errors.newEmail && (
          <Text style={{ color: 'red' }}>{formik.errors.newEmail}</Text>
        )}

        <Button style={{ marginTop: 20 }} icon="send" mode="contained" onPress={formik.handleSubmit} disabled={!formik.isValid}>
          Actualizar correo
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangeEmail;
