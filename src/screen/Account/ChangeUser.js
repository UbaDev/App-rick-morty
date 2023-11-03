import React from 'react';
import { View, Text, SafeAreaView, Alert} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { updateController } from '../../utils/api/updateUser';
import Toast from 'react-native-toast-message';

const ChangueUser = () => {
  const navigation = useNavigation();
  const { user, upDateUser } = useAuth();

  const validationSchema = yup.object().shape({
    usuario: yup.string().required('El usuario es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      usuario: user ? user.username : '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          username: values.usuario,
        };
        const userId = user.id;

        const response = await updateController.update(formData, userId);

        upDateUser('username', values.usuario);

        navigation.goBack();

        Alert.alert('Usuario actualizado', 'El usuario se actualizó correctamente');
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
          <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Ingresa el nuevo usuario</Text>
          <TextInput
            label="Usuario"
            value={formik.values.usuario}
            onChangeText={formik.handleChange('usuario')}
            onBlur={formik.handleBlur('usuario')}
          />
          {formik.touched.usuario && formik.errors.usuario && (
            <Text style={{ color: 'red' }}>{formik.errors.usuario}</Text>
          )}
        </View>

        <Button icon="send" mode="contained" onPress={formik.handleSubmit}>
          Actualizar usuario
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangueUser;
