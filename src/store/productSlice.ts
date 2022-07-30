import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/Product";
import { RootState } from "./store";

// Define a type for the slice state
interface ProductsState {
  products: IProduct[];
  status: string;
  error: any;
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
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
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeded";
        state.products = state.products.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    return data;
  }
);

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectProductById = (state: RootState, productId: number) =>
  state.products.products.find((product) => product.id === productId);
