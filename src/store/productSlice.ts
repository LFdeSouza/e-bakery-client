import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/Product";

// Define a type for the slice state
interface ProductsState {
  products: IProduct[];
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "Products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
