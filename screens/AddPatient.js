import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { db } from '../src/config/firebase';
import { useAuth } from './AuthProvider';

export default function AddPatient({ navigation }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [em_name, setEmName] = useState('');
  const [em_phone, setEmPhone] = useState('');

  const handleAddPatient = async () => {
    try {
      const patientRef = await db.collection('users').doc(user.uid).collection('patients').add({
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
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter patient name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter patient age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Text style={styles.label}>Emergency Contact Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter emergency contact name"
        value={em_name}
        onChangeText={(text) => setEmName(text)}
      />
      <Text style={styles.label}>Emergency Contact Phone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter emergency contact phone"
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