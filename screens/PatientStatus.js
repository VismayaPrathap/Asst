import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from './Styles'

const PatientStatus = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>User Details:</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Age: {user.age}</Text>
      <Text style={styles.text}>Emergency Contact Name: {user.em_name}</Text>
      <Text style={styles.text}>Emergency Contact Phone: {user.em_phone}</Text>
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