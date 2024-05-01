import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddPatient from "./screens/AddPatient";
import PatientList from "./screens/PatientList";
import PatientStatus from './screens/PatientStatus';
import Login from './screens/Login';
import { AuthProvider, useAuth } from './screens/AuthProvider';

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator initialRouteName={user? "Home" : "Login"}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Patient List" component={PatientList} />
      <Stack.Screen name="Details" component={AddPatient} />
      <Stack.Screen name="Patient Details" component={PatientStatus} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}