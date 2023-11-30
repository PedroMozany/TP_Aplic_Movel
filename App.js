import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import { firebaseConfig } from './firebase/config'; 



import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import ItemForm from './Screens/ItemForm';

const Stack = createStackNavigator()
export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemForm" component={ItemForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

