import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => {
    if (data.int === 1) {
      Alert.alert('Fall Detected!');
    }
  }, [data.int]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name:</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.text}>{user.name}</Text>
        </View>
        <Text style={styles.text}>Age:</Text>
        <View style={styles.detailBox}>
          <Text style={styles.text}>{user.age}</Text>
        </View>
        <Text style={styles.text}>Emergency Contact Name:</Text>
        <View style={styles.detailBox}>
          <Text style={styles.text}>{user.em_name}</Text>
        </View>
        <Text style={styles.text}>Emergency Contact Phone:</Text>
        <View style={styles.detailBox}>
          <Text style={styles.text}>{user.em_phone}</Text>
        </View>
        {
          data && (
            <View>
              <Text style={styles.text}>Pulse:</Text>
              <View style={styles.detailBox}>
                <Text style={styles.text}>{data.pulse}</Text>
              </View>
              <Text style={styles.text}>Fall Detection:</Text>
              <View style={styles.detailBox}>
                <Text style={styles.text}>{data.int}</Text>
              </View>
            </View>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "lightblue",
    padding: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientStatus;