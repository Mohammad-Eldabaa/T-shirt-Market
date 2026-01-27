import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function SwipeDeleteAction({ item, selectedItem, onRemove }) {
  if (!item) return null;

  const handleDelete = () => {
    onRemove({
      product: selectedItem.item,
      color: item.color,
      size: item.size,
    });

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'The Cart deleted Successfully',
      button: 'Ok',
      autoClose: 5000,
    });
  };

  return (
    <TouchableOpacity style={styles.swipeDelete} onPress={handleDelete}>
      <Text style={styles.swipeDeleteText}>🗑️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  swipeDelete: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 16,
    marginBottom: 12,
  },
  swipeDeleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
});
