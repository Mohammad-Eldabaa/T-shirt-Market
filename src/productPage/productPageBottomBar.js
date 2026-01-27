import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function ProductPageBottomBar({ product, color, size }) {
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ product, color, size }));
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: `${product?.title} add successfully`,
      autoClose: 1000,
    });
  };

  return (
    <View style={styles.bottomBar}>
      <Text style={styles.totalPrice}>${product?.price?.toFixed(2)}</Text>

      <TouchableOpacity
        style={[styles.addToCartButton, addedToCart && styles.addedButton]}
        onPress={handleAddToCart}
        activeOpacity={0.8}
      >
        <Text style={styles.addToCartText}>
          {addedToCart ? '✓ Added' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',

    // shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    // elevation (Android)
    elevation: 8,
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  addToCartButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  addedButton: {
    backgroundColor: '#4caf50',
  },

  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
