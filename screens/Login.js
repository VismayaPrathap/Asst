import { useAuth } from './AuthProvider';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { signIn, createUser } = useAuth();
  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      await createUser(email, password);
      alert('Account created successfully. Please log in.');
    } catch (error) {
      console.log(error);
      alert('Error creating account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert('Error signing in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const Separator =() => <View style={styles.separator}/>
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize='none'
        onChangeText={(text)=>setEmail(text)}
        style={styles.input} 
      />
      <TextInput
        placeholder="Password"
        value={password}
        autoCapitalize='none'
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      {loading ? (<ActivityIndicator size="large" color="#0000ff"/>
      ): (<>
      <Button title="Login" onPress={signInWithEmail} />
      <Separator/>
      <Button title="Create Account" onPress={signUpWithEmail} />
      </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});