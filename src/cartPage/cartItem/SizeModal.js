import {
  Modal,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SIZES = ['L', 'XL', 'XXL', 'XXXL'];

export default function SizeModal({
  visible,
  onClose,
  selectedSize,
  onSizeSelect,
}) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Select a Size</Text>

          <View style={styles.sizeGrid}>
            {SIZES.map(size => (
              <Pressable
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedSize,
                ]}
                onPress={() => {
                  onSizeSelect(size);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContainer: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeOption: {
    width: (width * 0.9 - 60) / 4,
    height: (width * 0.9 - 60) / 4,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedSize: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
