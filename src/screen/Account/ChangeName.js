import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { updateController } from '../../utils/api/updateUser';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

const ChangeName = () => {
  const navigation = useNavigation();
  const { user, upDateUser } = useAuth();

  const validationSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: user ? user.firstname : '',
      apellido: user ? user.lastname : '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          firstname: values.nombre,
          lastname: values.apellido,
        };
        const userId = user.id;

        const response = await updateController.update(formData, userId);

        upDateUser('firstname', values.nombre);
        upDateUser('lastname', values.apellido);
        
        navigation.goBack();
        Alert.alert('Nombre actualizado', 'El nombre se actualizó correctamente');
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
          <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Ingresa el nombre y apellido</Text>
          <TextInput
            label="Nombre"
            value={formik.values.nombre}
            onChangeText={formik.handleChange('nombre')}
            onBlur={formik.handleBlur('nombre')}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <Text style={{ color: 'red' }}>{formik.errors.nombre}</Text>
          )}
        </View>

        <View style={{ marginBottom: 20 }}>
          <TextInput
            label="Apellido"
            value={formik.values.apellido}
            onChangeText={formik.handleChange('apellido')}
            onBlur={formik.handleBlur('apellido')}
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <Text style={{ color: 'red' }}>{formik.errors.apellido}</Text>
          )}
        </View>

        <Button icon="send" mode="contained" onPress={formik.handleSubmit}>
          Actualizar nombre
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangeName;
