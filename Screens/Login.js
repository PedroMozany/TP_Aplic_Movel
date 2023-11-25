import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity,Image} from 'react-native';
import Button from '../Componete/Button'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config';


const LoginScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState();
const navigation = useNavigation();

const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login bem-sucedido!');
        navigation.navigate('Home'); 
      })
      .catch((error) => {
        alert('Erro ao fazer login: ' + error.message);
      });
  };

return (
<View style={styles.view}>
  <View style={styles.container}>
    <Text style={styles.title}> Welcome to list buy </Text>
    <Image style={styles.logo} source={require('../assets/carrinho.png')} />
  <View style={styles.div}>
     <Text style={styles.text}> EMAIL </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />
     <Text style={styles.textPass}> PASSWORD </Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
  </View>
      <Button title="LOGIN" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
      <Text style={styles.text}> REGISTER </Text>
      </TouchableOpacity>
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
div: {
    marginTop: '30%'
 
  },
  input: {
    backgroundColor: '#D9D9D9',
    border: 'none',
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: '10%',
    
  },
  text: {
    fontFamily: 'Rosarivo',
    color: '#fff',
    marginLeft: '11%',
  },
textPass: {
    fontFamily: 'Rosarivo',
    color: '#fff',
    marginLeft: '11%',
  },
  title: {
     fontFamily: 'Rosarivo',
    color: '#070707',
    fontSize: 28,
    marginLeft: 80,
    marginTop: 20
    
  },
    logo: {
    width:192,
    height: 137,
    marginLeft: 80
  },
});

export default LoginScreen;
