import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import BoxItemElement from '../Componete/BoxItemElement';
import AddItemButton from '../Componete/AddItemButton';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';  
import { firebase } from '../firebase/config';

const Home = ({ navigation}) => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
 const unsubscribeFocus = navigation.addListener('focus', () => {
  getItemsFromFirebase();
    });
    return () => unsubscribeFocus();
  }, [navigation]);


  const getItemsFromFirebase = async () => {
    const usuario = firebase.auth().currentUser;
    if (!usuario) {
      navigation.navigate('Login');
      return;
    }

    const usuarioId = usuario.uid;
    const itemsRef = firebase.firestore().collection('itens').where('usuarioId', '==', usuarioId);

    try {
      const querySnapshot = await itemsRef.get();
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAllItems(data);
      if (!searchText) {
        setFilteredItems(data);
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  const goToForm = () => {
    navigation.navigate('ItemForm');
  };

  const renderItens = (items) => {
    const rows = [];
    const itemCount = items.length;

    if (itemCount === 0) {
      rows.push(
        <View key="addButton" style={styles.row}>
          <AddItemButton onPress={goToForm} />
        </View>
      );
    } else {
      rows.push(
        <View key="addButton" style={styles.row}>
          <AddItemButton onPress={goToForm} />
          <BoxItemElement 
            item={items[0]}
            navigation={navigation}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </View>
      );

      for (let i = 1; i < items.length; i += 2) {
        const row = (
          <View key={i} style={styles.row}>
            {i + 1 < items.length && <BoxItemElement item={items[i + 1]} navigation={navigation} />}
            <BoxItemElement 
              item={items[i]} 
              navigation={navigation}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </View>
        );
        rows.push(row);
      }
    }

    return rows;
  };

  function handleTextFromSearchChange(text) {
    setSearchText(text);
  }

  function handleSearchChange() {
    if (searchText) {
      if (!searchText) {
        setFilteredItems(allItems);
      } else {
        const filteredList = allItems.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredItems(filteredList);
      }
    }else{
      getItemsFromFirebase()
    }
  }

  const handleEdit = (item) => {
    navigation.navigate('ItemForm', { item: item });
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            firebase.firestore().collection('itens').doc(item.id).delete()
              .then(() => {
                Alert.alert('Sucesso','Item deletado com sucesso!');
                getItemsFromFirebase();
              })
              .catch((error) => {
                Alert.alert('Erro','Erro ao deletar o item:' + error);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  function handleLogout() {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja sair?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sair',
            onPress: async () => {
              try {
                await firebase.auth().signOut();
                navigation.navigate('Login');
              } catch (error) {
                console.error('Error signing out: ', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <View style={styles.content}>
        <TouchableOpacity style={styles.iconLogout} onPress={handleLogout}>
            <MaterialIcons name="logout" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>LISTA DE COMPRAS</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleTextFromSearchChange(text)}
            placeholder="Busque o nome do Item"
            clearButtonMode="always"
          />
          <TouchableOpacity style={styles.iconSearch} onPress={handleSearchChange}>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
          <View style={styles.mainListContainer}>
            {renderItens(filteredItems)} 
          </View>
      </View>
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
  mainListContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: '93%', // Ajuste para preencher toda a largura
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  iconSearch: {
    backgroundColor: '#E35454',
    padding: 10,
    marginLeft: 10,
    width:'15%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  iconLogout: {
    paddingTop: 7,
    paddingRight: 20,
    paddingBottom: 7,
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 24,
    height: 50,
    fontSize: 16,
    paddingStart: 10,
  }
});

export default Home;