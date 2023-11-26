import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function ItemForm() {
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipoQuantidade, setTipoQuantidade] = useState('unidade');
  const [observacao, setObservacao] = useState('');

  function handleDescriptionChange(descricao) {
    setDescricao(descricao);
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

  async function handleButtonPress() {
    /* SALVAR NO FIREBASE + ADICIONAR VALIDACOES */
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione Itens à Lista</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DESCRIÇÃO:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleDescriptionChange}
          placeholder="Digite o Item"
          clearButtonMode="always"
          value={descricao}
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
