import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../api';

export default function SummaryScreen() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    api.get('/orders/summary').then(res => setSummary(res.data)).catch(console.error);
  }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={summary}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ borderWidth:1, padding:12, marginBottom:8 }}>
            <Text style={{ fontWeight:'bold' }}>{item.nome}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Pedidos: {item.num_pedidos}</Text>
            <Text>Total gasto: R$ {Number(item.total_gasto).toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}
