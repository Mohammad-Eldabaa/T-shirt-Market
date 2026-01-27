import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './fetchData';
import uuid from 'react-native-uuid';

const initialState = {
  data: [],
  cart: [],
  loading: false,
  error: null,
};

const dedupeCartItems = cart => {
  const map = new Map();

  for (const item of cart) {
    const key = `${item.item.title}-${item.color}-${item.size}`;

    if (map.has(key)) {
      map.get(key).quantity += item.quantity;
    } else {
      map.set(key, { ...item });
    }
  }

  return Array.from(map.values());
};

export const DataSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, color, size } = action.payload;

      const item = state.cart.find(
        cartItem =>
          cartItem?.item?.title === product?.title &&
          cartItem?.color === color &&
          cartItem?.size === size,
      );

      if (!item) {
        state.cart.push({
          id: uuid.v4(),
          item: product,
          quantity: 1,
          color,
          size,
        });
      } else {
        item.quantity += 1;
      }
    },

    removeFromCart: (state, action) => {
      const { product, color, size } = action.payload;

      const item = state.cart.find(
        cartItem =>
          cartItem?.item?.title === product?.title &&
          cartItem?.color === color &&
          cartItem?.size === size,
      );

      if (!item) return;

      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          cartItem =>
            !(
              cartItem?.item?.title === product?.title &&
              cartItem?.color === color &&
              cartItem?.size === size
            ),
        );
      } else {
        item.quantity -= 1;
      }
    },

    clearCart: state => {
      state.cart = [];
    },

    clearItem: (state, action) => {
      const { product, color, size } = action.payload;
      console.log(product.product);
      state.cart = state.cart.filter(
        item =>
          !(
            item?.item?.title === product?.product?.title &&
            item?.color === product.color &&
            item?.size === product.size
          ),
      );
    },

    changeColor: (state, action) => {
      const { product, newColor } = action.payload;

      const selectedItem = state.cart.find(
        item =>
          item?.item?.title === product?.item?.title &&
          item?.color === product.color &&
          item?.size === product.size,
      );

      if (selectedItem) {
        selectedItem.color = newColor;
        state.cart = dedupeCartItems(state.cart);
      }
    },

    changeSize: (state, action) => {
      const { product, newSize } = action.payload;

      const selectedItem = state.cart.find(
        item =>
          item?.item?.title === product?.item?.title &&
          item?.color === product.color &&
          item?.size === product.size,
      );

      if (selectedItem) {
        selectedItem.size = newSize;
        state.cart = dedupeCartItems(state.cart);
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  clearItem,
  changeColor,
  changeSize,
} = DataSlice.actions;

export default DataSlice.reducer;
