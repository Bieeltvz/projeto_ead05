import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../api';

export default function AddClientScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nome || !emailRegex.test(email)) {
      Alert.alert('Erro', 'Nome e email válidos são obrigatórios');
      return;
    }
    try {
      await api.post('/clients', { nome, email, telefone });
      Alert.alert('Sucesso', 'Cliente cadastrado');
      setNome(''); setEmail(''); setTelefone('');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível cadastrar');
    }
  };

  return (
    <View style={{ padding:16 }}>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Text>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}
