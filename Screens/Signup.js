import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from '../Componete/Button'
import { firebase } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigation = useNavigation();

const handleSignup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
    }
  };

  return (
  <View style={styles.view}>
    <View style={styles.container}>
    <Text style={styles.title}> Register</Text>
     <View style={styles.div}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email address"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Create password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirn password"
      />
    <Button title="NEXT" onPress={handleSignup} />
    </View>
    </View>
</View>
  );
};



const styles = StyleSheet.create({
view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DEAEAE'
  },
container: {
    backgroundColor: '#E37B',
    with: 391,
    height: 628,
    borderRadius: 50
  },
   input: {
    backgroundColor: '#D9D9D9',
    border: 'none',
    height:40,
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: '10%'
  },
  div: {
    marginTop: '50%'
 
  },
   title: {
     fontFamily: 'Rosarivo',
    color: '#070707',
    fontSize: 40,
    marginLeft: 40,
    marginTop: 20
    
  },
});

export default Register;
