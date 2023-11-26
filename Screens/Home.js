import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BoxItemElement from '../Componete/BoxItemElement';
import AddItemButton from '../Componete/AddItemButton';

const Home = ({ navigation }) => {
  const goToForm = () => {
    navigation.navigate('ItemForm');
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>LIST BUY</Text>
      <View style={styles.row}>
        <AddItemButton onPress={goToForm} />
        <BoxItemElement item={{ name: 'Item 1' }} />
      </View>
      <View style={styles.row}>
        <BoxItemElement item={{ name: 'Item 2' }} />
        <BoxItemElement item={{ name: 'Item 3' }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#E37B7B',
    alignItems: 'center',
    paddingTop: 25,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inika',
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default Home;