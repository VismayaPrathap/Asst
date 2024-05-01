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
  const [error, setError] = useState('');

  const handleAddPatient = async () => {
    if (!name || !age || !em_name || !em_phone) {
      setError('Please fill in all the fields before adding a patient.');
      return;
    }

    if (isNaN(age)) {
      setError('Age must be a number.');
      return;
    }

    if (isNaN(em_phone)) {
      setError('Emergency contact phone number must be a number.');
      return;
    }

    try {
      await db.ref(`users/${user.uid}/patients`).push({
        name,
        age: parseInt(age),
        em_name,
        em_phone: parseInt(em_phone),
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
        keyboardType="numeric"
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
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Pressable style={globalStyles.button} onPress={handleAddPatient}>
        <Text style={globalStyles.listItemText}>Add Patient</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    width: 350,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#72bcd4',
    padding: 10,
    borderRadius: 4,
    width: 100,
    alignItems: 'center',
    margin: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});