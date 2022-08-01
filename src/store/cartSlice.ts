import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICartItem, INewOrder } from "../types/Product";
import { store, RootState } from "./store";

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
    fillCart: (state, action: PayloadAction<ICartItem[]>) => {
      action.payload.forEach((item) => {
        state.items.push(item);
      });
    },
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      if (state.items.find((item) => item.id === action.payload.id)) return;
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items.splice(
        state.items.findIndex((item) => item.id === action.payload),
        1
      );
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
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
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  fillCart,
  emptyCart,
} = cartSlice.actions;

export const placeOrder = createAsyncThunk(
  "cart/addToCart",
  async (order: INewOrder) => {
    try {
      if (order.userId) {
        const res = await axios.post("/api/orders", order);
        const newOrder = res.data.newOrder as ICartItem;
        store.dispatch(addToCart(newOrder));
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      }
      console.log(err);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "cart/update",
  async ({ orderId, operation }: { orderId: string; operation: string }) => {
    try {
      const body = { operation };
      await axios.put(`/api/orders/${orderId}`, body);
      operation === "increment"
        ? store.dispatch(incrementQuantity(orderId))
        : store.dispatch(decrementQuantity(orderId));
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      }
      console.log(err);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "cart/removeOrder",
  async (orderId: string) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      store.dispatch(removeFromCart(orderId));
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      }
      console.log(err);
    }
  }
);

export default cartSlice.reducer;

export const selectOrderByProductId = (state: RootState, productId: number) =>
  state.cart.items.find((item) => item.product.id === productId);
