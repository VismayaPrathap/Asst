import React, { useState, useEffect } from 'react';
import { db } from '../src/config/firebase';
import { StyleSheet, Button, Text, TouchableOpacity, FlatList ,View, SafeAreaView } from 'react-native';
import { useAuth } from './AuthProvider';
import DeleteUser from './DeleteUser';
import { globalStyles } from './Styles';

export default function PatientList({ navigation }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(true);
      db.ref(`users/${user.uid}/patients`).on('value', (snapshot) => {
        const patientsList = [];
        snapshot.forEach((childSnapshot) => {
          patientsList.push({...childSnapshot.val(), id: childSnapshot.key });
        });
        setPeople(patientsList);
        setLoading(false);
      });
    } else {
      setPeople([]);
      setLoading(false);
    }
  }, [user]); // Add user as a dependency so that the effect runs again when user changes

  const handleItemClick = (item) => {
    navigation.navigate("Patient Details", { user: item });
  };

  const renderItem = ({ item }) => (
    <View style={globalStyles.listItem}>
      <TouchableOpacity
        onPress={() => handleItemClick(item)}
        style={styles.button}
      >
      <Text style={globalStyles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
      <DeleteUser id={item.id} navigation={navigation} />
    </View>
  );

  const Separator =() => <View style={styles.separator}/>

  return (
    <SafeAreaView style={globalStyles.container}>
      <Separator/>
      <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
        <Button
          onPress={() => navigation.navigate("Details")}
          title="Add a Patient"
          color="#72bcd4"
        />
      </View>
      <View>
        <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      </View>
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
    backgroundColor: '#72bcd4', 
    padding: 10, 
    borderRadius: 5, 
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'black',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});