import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SizeSelector({
  sizes = ['L', 'XL', 'XXL', 'XXXL'],
  selectedSize,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      {sizes.map(size => {
        const isSelected = selectedSize === size;

        return (
          <TouchableOpacity
            key={size}
            style={[styles.sizeBox, isSelected && styles.selectedBox]}
            onPress={() => onSelect(size)}
            activeOpacity={0.8}
          >
            <Text style={[styles.sizeText, isSelected && styles.selectedText]}>
              {size}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 20,
  },

  sizeBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    backgroundColor: '#fff',
  },

  selectedBox: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },

  sizeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  selectedText: {
    color: '#fff',
  },
});
