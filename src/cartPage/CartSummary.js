import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CartSummary({ totalPrice, onCheckout }) {
  const { cart } = useSelector(state => state.store);
  const dispatch = useDispatch();
  return (
    <View style={styles.bottomBar}>
      <View style={styles.totalContainer}>
        <Text style={styles.bottomTotalLabel}>Total</Text>
        <Text style={styles.bottomTotalPrice}>${totalPrice?.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
        <Text style={styles.checkoutArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
  },
  totalContainer: { flex: 1, marginRight: 16 },
  bottomTotalLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  bottomTotalPrice: { fontSize: 24, fontWeight: '800', color: '#1a1a1a' },
  checkoutButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  checkoutArrow: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
