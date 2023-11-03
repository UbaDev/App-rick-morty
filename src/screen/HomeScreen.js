import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Card from '../components/Card';

export default function HomeScreen({ characters }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(characters.results || []);

  useEffect(() => {
    loadMoreData()
  }, []);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
      const newData = await response.json();
      setPage(nextPage);
      setData((prevData) => [...prevData, ...newData.results]);
    } catch (error) {
      console.error('Error al cargar más datos:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card characters={item} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#81D4FA" />}
      />
    </SafeAreaView>
  );
}
