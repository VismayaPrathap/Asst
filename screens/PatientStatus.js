import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from './Styles'
import { ref, onValue } from 'firebase/database'
import { db } from "../src/config/firebase";

const PatientStatus = ({ route }) => {
  const { user } = route.params;
  const [data, setData] = useState({});

  useEffect(()=> {
    const userData = ref(db, 'test/');
    onValue(userData, (snapshot) => {
      const userDataVal = snapshot.val();
      setData(userDataVal);
    })
  }, []);
  
  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>User Details:</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Age: {user.age}</Text>
      <Text style={styles.text}>Emergency Contact Name: {user.em_name}</Text>
      <Text style={styles.text}>Emergency Contact Phone: {user.em_phone}</Text>
      {
        data && (
          <View>
            <Text style={styles.text}>Pulse: {data.pulse}</Text>
            <Text style={styles.text}>Int: {data.int}</Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PatientStatus;