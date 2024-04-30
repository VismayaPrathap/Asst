import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../src/config/firebase";
import { useAuth } from './AuthProvider';
import { globalStyles } from './Styles';

export default function DeleteUser({ id, navigation }) {
  const { user } = useAuth(); // Get the current user from the AuthProvider
  const patientDb = doc(db, `users/${user.uid}/patients`, id); // Get the specific patient document

  function deleteUser() {
    deleteDoc(patientDb)
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