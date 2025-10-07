import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api';

export default function AddOrderScreen({ navigation }) {
  const [clients, setClients] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    api.get('/clients').then(res => setClients(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    const numericValor = parseFloat(String(valor).replace(',', '.'));
    if (!clienteId || isNaN(numericValor)) {
      Alert.alert('Erro', 'Selecione cliente e informe valor válido');
      return;
    }
    try {
      await api.post('/orders', { cliente_id: clienteId, descricao, valor: numericValor });
      Alert.alert('Sucesso', 'Pedido cadastrado');
      navigation.navigate('Orders');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível cadastrar pedido');
    }
  };

  return (
    <View style={{ padding:16 }}>
      <Text>Cliente</Text>
      <Picker selectedValue={clienteId} onValueChange={setClienteId}>
        <Picker.Item label="Selecione..." value="" />
        {clients.map(c => <Picker.Item key={c.id} label={`${c.nome} (${c.email})`} value={c.id} />)}
      </Picker>
      <Text>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Text>Valor (ex: 100.50)</Text>
      <TextInput value={valor} onChangeText={setValor} keyboardType="numeric" style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Button title="Salvar Pedido" onPress={handleSubmit} />
    </View>
  );
}
