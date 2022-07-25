import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Product } from "../types/Product";

// Define a type for the slice state
interface ProductsState {
  products: Product[];
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "Products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const products = (state: RootState) => state.products;

export default productsSlice.reducer;
