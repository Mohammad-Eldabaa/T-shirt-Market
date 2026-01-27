import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ColorSelector({
  colors = [
    '#000',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
  ],
  selectedColor,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const isSelected = selectedColor === color;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              isSelected && styles.selectedColor,
            ]}
            onPress={() => {
              onSelect(color);
            }}
            activeOpacity={0.8}
          />
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

  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  selectedColor: {
    borderWidth: 3,
    borderColor: '#1a1a1a',
  },
});
