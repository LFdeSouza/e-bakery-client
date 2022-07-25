import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/Product";

interface cartState {
  items: ICartItem[];
}

const initialState: cartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      if (state.items.find((item) => item.id === action.payload.id)) return;
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(
        state.items.findIndex((item) => item.id === action.payload),
        1
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity === 1
          ? state.items.splice(
              state.items.findIndex((item) => item.id === action.payload),
              1
            )
          : item.quantity--;
      }
    },
  },
});

export const {
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
