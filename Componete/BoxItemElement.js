import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe os ícones necessários

const BoxItemElement = ({ item }) => {
  const handleEdit = () => {
    // fazer lo´gica editar
  };

  const handleDelete = () => {
     // fazer lo´gica editar
  };

  return (
    <View style={styles.box}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <MaterialIcons name="edit" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <MaterialIcons name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '45%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DEAEAE',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10,
  },
  button: {
    marginLeft: 5,
  },
  itemNameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#D9D9D9',
    padding: 6,
  },
  itemName: {
    textAlign: 'center',
    color: '#00000080'
  },
});

export default BoxItemElement;