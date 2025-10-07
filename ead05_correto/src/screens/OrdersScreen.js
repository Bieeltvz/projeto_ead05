import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop:20 }} />;

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={orders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ borderWidth:1, padding:12, marginBottom:8 }}>
            <Text style={{ fontWeight:'bold' }}>{item.descricao}</Text>
            <Text>Cliente: {item.nome} ({item.email})</Text>
            <Text>Valor: R$ {Number(item.valor).toFixed(2)}</Text>
            <Text>Data: {new Date(item.data_pedido).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
