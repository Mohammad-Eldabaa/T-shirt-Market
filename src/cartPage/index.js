import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Alert } from 'react-native';
import CartItem from './cartItem/CartItem';
import CartHeader from './CartHeader';
import CartEmpty from './CartEmpty';
import CartSummary from './CartSummary';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, clearItem } from '../redux/slice';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function CartPage({ navigation }) {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.store);

  const handleClear = () => {
    dispatch(clearCart());
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'The Cart deleted Successfully',
      button: 'Ok',
    });
  };

  const clearSpecificItem = (product, color, size) => {
    dispatch(clearItem({ product, color, size }));
  };
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Add items before checkout.');
      return;
    }
    Alert.alert('Checkout', 'Proceeding...');
  };
  const calculateTotal = () =>
    cart.reduce((total, i) => total + i.item.price * i.quantity, 0);
  const getTotalItems = () => cart.reduce((total, i) => total + i.quantity, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <CartHeader
        totalItems={getTotalItems()}
        onBack={() => navigation?.goBack()}
        onClear={handleClear}
      />

      {cart.length === 0 ? (
        <CartEmpty onContinue={() => navigation?.goBack()} />
      ) : (
        <>
          <ScrollView
            style={{ flex: 1, marginBottom: 72 }}
            contentContainerStyle={{ padding: 16 }}
          >
            {cart.map(
              item =>
                item.quantity > 0 && (
                  <CartItem
                    key={item.id}
                    selectedItem={item}
                    onRemove={clearSpecificItem}
                  />
                ),
            )}
          </ScrollView>
          <CartSummary
            totalPrice={calculateTotal()}
            onCheckout={handleCheckout}
          />
        </>
      )}
    </View>
  );
}
