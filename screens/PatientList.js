import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, FlatList ,View, SafeAreaView } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/config/firebase';
import DeleteUser from './DeleteUser';
import PatientStatus from './PatientStatus';
import { useAuth } from './AuthProvider'
import { fb_auth } from '../src/config/firebase';

export default function PatientList({ navigation }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the current user from the AuthProvider

  useEffect(() => {
    if (user) { // Check if user is logged in
      setLoading(true);
      const patientsQuery = db.collection('users').doc(user.uid).collection('patients').get(); // Get the patients collection for the current user
      patientsQuery.then((querySnapshot) => {
        const patientsList = [];
        querySnapshot.forEach((doc) => {
          patientsList.push({ ...doc.data(), id: doc.id });
        });
        setPeople(patientsList);
        setLoading(false);
      }).catch((error) => {
        console.log('Error getting patients: ', error);
        setLoading(false);
      });

      const unsubscribe = onSnapshot(db.collection('users').doc(user.uid).collection('patients'), (querySnapshot) => {
        const patientsList = [];
        querySnapshot.forEach((doc) => {
          patientsList.push({ ...doc.data(), id: doc.id });
        });
        setPeople(patientsList);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
      
    } else {
      setPeople([]);
      setLoading(false);
    }
  }, [user]); // Add user as a dependency so that the effect runs again when user changes

  const handleItemClick = (item) => {
    navigation.navigate("Status", { user: item });
  };

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity
        onPress={() => handleItemClick(item)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
      <DeleteUser id={item.id} navigation={navigation} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Patient List:</Text>
      </View> 

      <View style={[{ width: "30%", margin: 10, backgroundColor: "red" }]}>
        <Button
          onPress={() => navigation.navigate("Details")}
          title="+"
          color="#FF3D00"
        />
      </View>
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: 'lightblue', 
    padding: 10, 
    borderRadius: 5, 
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'black',
  },
});