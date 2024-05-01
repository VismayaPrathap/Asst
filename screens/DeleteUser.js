import React from 'react';
import { db } from "../src/config/firebase";
import { useAuth } from './AuthProvider';
import { Text, View, Pressable } from 'react-native';
import { globalStyles } from './Styles'

export default function DeleteUser({ id, navigation }) {
  const { user } = useAuth();
  const patientRef = db.ref(`users/${user.uid}/patients/${id}`);

  function deleteUser() {
    patientRef.remove()
     .then(() => {
        console.log('User deleted successfully');
      })
     .catch((error) => {
       console.log('Error deleting user: ', error);
      });
  }

  return (
    <View style={globalStyles.container}>
      <Pressable onPress={deleteUser}>
        <Text>Delete this Patient</Text>
      </Pressable>
    </View>
  );
}