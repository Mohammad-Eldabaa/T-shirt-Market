import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  changeColor,
  changeSize,
  removeFromCart,
} from '../../redux/slice';
import { Swipeable } from 'react-native-gesture-handler';
import SwipeDeleteAction from './SwipeableRenderRightActions';
import ColorModal from './ColorModal';
import SizeModal from './SizeModal';

export default function CartItem({ selectedItem, onRemove }) {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.store);
  const [visible, setVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);

  const [item, setItem] = useState(null);

  // const onColorSelect

  useEffect(() => {
    const foundItem = cart.find(cartItem => cartItem?.id === selectedItem?.id);
    setItem(foundItem || null);
  }, [cart, selectedItem]);

  if (!selectedItem?.item) return null;

  return (
    <Swipeable
      renderRightActions={() => (
        <SwipeDeleteAction
          item={item}
          selectedItem={selectedItem}
          onRemove={onRemove}
        />
      )}
    >
      <View style={styles.cartItem}>
        <Image
          source={{ uri: selectedItem.item.thumbnail }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.itemDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {selectedItem.item.title}
          </Text>
          <Text style={styles.productPrice}>
            ${selectedItem.item.price?.toFixed(2)}
          </Text>

          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                dispatch(
                  removeFromCart({
                    product: selectedItem.item,
                    color: selectedItem.color,
                    size: selectedItem.size,
                  }),
                )
              }
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{item?.quantity || 0}</Text>
            </View>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                dispatch(
                  addToCart({
                    product: selectedItem.item,
                    color: selectedItem.color,
                    size: selectedItem.size,
                  }),
                )
              }
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={[
              styles.colorView,
              { borderRadius: 8, backgroundColor: item?.color },
            ]}
            onPress={() => {
              setVisible(true);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setSizeModalVisible(true);
            }}
          >
            <Text style={[styles.itemTotal, { margin: 8, marginBottom: 12 }]}>
              {item?.size}
            </Text>
          </TouchableOpacity>

          <Text style={styles.itemTotal}>
            $
            {((selectedItem.item.price || 0) * (item?.quantity || 0)).toFixed(
              2,
            )}
          </Text>
        </View>
      </View>
      <ColorModal
        // selectedColor={'#000'}
        visible={visible}
        onClose={() => setVisible(false)}
        onColorSelect={color => {
          dispatch(changeColor({ product: item, newColor: color }));
        }}
      />
      <SizeModal
        visible={sizeModalVisible}
        onClose={() => setSizeModalVisible(false)}
        // selectedSize={selectedSize}
        onSizeSelect={size => {
          dispatch(changeSize({ product: item, newSize: size }));
        }}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },

  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 20,
  },

  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  quantityDisplay: {
    marginHorizontal: 16,
    minWidth: 24,
    alignItems: 'center',
  },

  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  colorView: {
    margin: 8,
    width: 40,
    height: 20,
  },

  deleteIcon: {
    fontSize: 20,
  },

  itemTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
  },
});
