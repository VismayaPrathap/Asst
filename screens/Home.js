import React from 'react';
import { StyleSheet, Pressable, Text, View, SafeAreaView, Button, Platform } from 'react-native';
import { useAuth } from '../screens/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from './Styles';

export default function Home() {
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("Logout Failed: " + error.message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button
            onPress={() => navigation.navigate("Patient List")}
            title="Caregiver"
            color="#72bcd4"
          />
        </View>
        {/* <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button
            title="Patient"
            color="#FF3D00"
          />
        </View> */}
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});