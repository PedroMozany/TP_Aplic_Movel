import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddItemButton = ({ onPress }) => {
  return (
    <View style={styles.box}>
        <TouchableOpacity
          style={styles.addBox}
          onPress={onPress}
      >
        <MaterialIcons name="add" size={80} color="#E35454" />
        <Text style={styles.addText}>New board</Text>
      </TouchableOpacity>
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
  addBox: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  addText: {
    color: '#00000080',
    fontSize: 15,
  },
});

export default AddItemButton;