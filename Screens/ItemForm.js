import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { firebase} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

export default function ItemForm({ route }) {
  const [name, setName] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipoQuantidade, setTipoQuantidade] = useState('unidade');
  const [observacao, setObservacao] = useState('');
  const itensFirebase = firebase.firestore().collection('itens');
  const [editItem, setEditItem] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    // Caso edição, irá verificar pela route que for repassado
    if (route.params && route.params.item) {
      const itemToEdit = route.params.item;
      setName(itemToEdit.name);
      setQuantidade(itemToEdit.quantidade);
      setTipoQuantidade(itemToEdit.tipoQuantidade);
      setObservacao(itemToEdit.observacao);
      setEditItem(itemToEdit);
    }
  }, [route.params]);

  function handleNameChange(name) {
    setName(name);
  }

  function handleQuantityChange(value) {
    setQuantidade(value);
  }

  function handleTipoQuantidadeChange(value) {
    setTipoQuantidade(value);
  }

  function handleObservacaoChange(observacao) {
    setObservacao(observacao); 
  }

  async function handleAddItem(data) {
    try {
      await itensFirebase
        .add(data)
        .then(() => {
          Alert.alert('Sucesso', 'Item salvo com sucesso!');
          navigation.navigate('Home');
        })
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao salvar o item:' + error);
    }
  }

  async function handleUpdateItem(data) {
    try {
      await itensFirebase
        .doc(editItem.id)
        .update(data)
        .then(() => {
          Alert.alert('Sucesso', 'Item atualizado com sucesso!');
          navigation.navigate('Home');
        })
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao atualizar o item:' + error);
    }
  }

  async function handleButtonPress() {
    if (!name.trim() || !quantidade.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const usuarioId = firebase.auth().currentUser.uid;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      name,
      quantidade,
      tipoQuantidade,
      observacao,
      usuarioId,
      createdAt: timestamp,
    };
    
    if (editItem) {
      await handleUpdateItem(data);
    } else {
      await handleAddItem(data);
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione Itens à Lista</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Item:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNameChange}
          placeholder="Digite o Item"
          clearButtonMode="always"
          value={name}
        />
        <Text style={styles.label}>QUANTIDADE:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleQuantityChange}
          placeholder="Digite a Quantidade"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidade.toString()}
        />
        <Text style={styles.label}>TIPO DE QUANTIDADE:</Text>
          <Picker
            style={styles.input}
            selectedValue={tipoQuantidade}
            onValueChange={handleTipoQuantidadeChange}
          >
            <Picker.Item label="Unidade" value="unidade" />
            <Picker.Item label="Litro" value="litro" />
            <Picker.Item label="Quilograma" value="kg" />
            <Picker.Item label="Grama" value="g" />
            <Picker.Item label="Pacote" value="pacote" />
            <Picker.Item label="Caixa" value="caixa" />
          </Picker>
        <Text style={styles.label}>OBSERVAÇÃO (OPCIONAL):</Text>
        <TextInput
          style={[styles.input, styles.observationInput]}
          onChangeText={handleObservacaoChange}
          placeholder="Digite a Observação"
          clearButtonMode="always"
          value={observacao}
          multiline={true}
          numberOfLines={4}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.icon} onPress={handleButtonPress}>
            <AntDesign name="checkcircleo" size={45} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#DEAEAE',
    alignItems: 'center'
  },
  label: {
    fontFamily: 'Rosarivo',
    marginTop: 20,
    fontSize: 15,
    color: '#FFFFFF',
  },
  title: {
    color: '#00000',
    fontSize: 30,
    fontFamily: 'Rosario',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15,
    backgroundColor: '#E37B7B',
    elevation: 5,
  },
  input: {
    marginTop: 3,
    height: 60,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  observationInput: {
    height: 120
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  icon: {
    marginLeft: 20,
    alignItems: 'center',
  },
});