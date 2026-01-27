import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slice';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function QuantityButtons({
  product,
  color,
  size,
  selectedColor,
  selectedSize,
}) {
  const [item, setItem] = useState(null);

  const { cart } = useSelector(state => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundItem = cart.find(
      cartItem =>
        cartItem?.item?.title === product?.title &&
        cartItem?.color === color &&
        cartItem?.size === size,
    );
    setItem(foundItem || { quantity: 0 });
  }, [cart, product, selectedColor, selectedSize]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, item?.quantity === 0 && styles.disabledButton]}
        onPress={() => {
          dispatch(removeFromCart({ product, color, size }));
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Success',
            textBody: `${product?.title} deleted successfully`,
            autoClose: 1000,
          });
        }}
        disabled={item?.quantity === 0}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>

      <View style={styles.quantityBox}>
        <Text style={styles.quantityText}>{item?.quantity}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(addToCart({ product, color, size }));
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: `${product?.title} add successfully`,
            autoClose: 1000,
          });
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  quantityBox: {
    marginHorizontal: 20,
    minWidth: 40,
    alignItems: 'center',
  },

  quantityText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
