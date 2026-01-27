import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width } = Dimensions.get('window');

export default function ProductPreview({ product }) {
  return (
    <View>
      <View style={styles.imageContainer}>
        <BottomSheetScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {product?.images?.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </BottomSheetScrollView>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{product?.title}</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingVertical: 8,
    height: width * 0.58,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },

  productImage: {
    width: width * 0.8,
    height: width * 0.53,
    marginHorizontal: 20,
    backgroundColor: '#c4f4e7',
    borderRadius: 16,
    resizeMode: 'contain',
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: 'red',
  },

  productName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
  },
});
