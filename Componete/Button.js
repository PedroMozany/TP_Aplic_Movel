import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
   backgroundColor: '#E35454',
    border: 'none',
    height: 40,
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: '10%',

  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
    marginLeft: 140,
    fontFamily: 'Rosarivo'
  },
});


export default Button;
