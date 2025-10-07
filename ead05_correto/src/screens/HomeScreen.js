import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Cadastrar Cliente" onPress={() => navigation.navigate('AddClient')} />
      <View style={{ height: 10 }} />
      <Button title="Cadastrar Pedido" onPress={() => navigation.navigate('AddOrder')} />
      <View style={{ height: 10 }} />
      <Button title="Ver Pedidos" onPress={() => navigation.navigate('Orders')} />
      <View style={{ height: 10 }} />
      <Button title="Resumo por Cliente" onPress={() => navigation.navigate('Summary')} />
    </View>
  );
}
