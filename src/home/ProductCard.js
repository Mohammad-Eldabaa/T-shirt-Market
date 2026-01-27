import LinearGradient from 'react-native-linear-gradient';
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const pulse = {
  from: {
    transform: [{ scale: 0.8 }, { rotateZ: '-8deg' }],
  },
  to: {
    transform: [{ scale: 1.2 }, { rotateZ: '0deg' }],
  },
};

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#a8edea', '#fed6e3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientImage}
      >
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        <Animated.View
          style={{
            animationName: pulse,
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDirection: 'alternate',
          }}
        >
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.productImage}
          ></Image>
        </Animated.View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.productPrice}>{product.price.toFixed(2)}</Text>
        </View>

        <View style={styles.detailButton}>
          <Text style={styles.detailButtonText}>View Details</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  gradientImage: {
    height: 160,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    color: '#1a1a1a',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  cardContent: {
    padding: 14,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    minHeight: 38,
    lineHeight: 19,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  currency: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginLeft: 2,
  },
  detailButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  arrow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
