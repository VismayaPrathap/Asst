import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { db } from '../src/config/firebase';
import { useAuth } from './AuthProvider';
import { globalStyles } from './Styles';

export default function AddPatient({ navigation }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [em_name, setEmName] = useState('');
  const [em_phone, setEmPhone] = useState('');

  const handleAddPatient = async () => {
    try {
      await db.ref(`users/${user.uid}/patients`).push({
        name,
        age,
        em_name,
        em_phone,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert('Error adding patient: ' + error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.label}>Enter the details of the patient:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Emergency Contact Name"
        value={em_name}
        onChangeText={(text) => setEmName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Emergency Contact Phone"
        value={em_phone}
        onChangeText={(text) => setEmPhone(text)}
      />
      <Pressable style={styles.button} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 4,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});