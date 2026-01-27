import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from './ProductCard';
import Status from './status';
import Header from './header';
import ProductDetailPage from '../productPage';
import { fetchData } from '../redux/fetchData';

export default function ShopPage({ navigation }) {
  const { data, loading, error } = useSelector(state => state.store);
  const dispatch = useDispatch();

  const bottomSheetRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleViewDetails = product => {
    setSelectedProduct(product);
    // Open bottom sheet if available
    bottomSheetRef.current?.snapToIndex?.(1);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Status products={data} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {data.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleViewDetails(product)}
            />
          ))}
        </View>
      </ScrollView>

      <ProductDetailPage
        bottomSheetRef={bottomSheetRef}
        product={selectedProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
