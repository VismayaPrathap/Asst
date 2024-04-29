import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddPatient from "./screens/AddPatient";
import PatientList from "./screens/PatientList";
import PatientStatus from './screens/PatientStatus';
import Login from './screens/Login';
import { AuthProvider } from './screens/AuthProvider';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Caregiver" component={PatientList} />
          <Stack.Screen name="Details" component={AddPatient} />
          <Stack.Screen name="Status" component={PatientStatus} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}