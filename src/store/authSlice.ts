import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUser, IResponseLoadUser } from "../types/User";
import { RootState, store } from "./store";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
      state.error = null;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, logout, setError } = authSlice.actions;

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    store.dispatch(setLoading());
    const res = (await axios.get("/api/users/loadUser"))
      .data as IResponseLoadUser;
    const { id, username, orders } = res.user;
    store.dispatch(setUser({ id, username }));
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data.msg);
    } else {
      console.log(err);
    }
  }
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { username: string; password: string }) => {
    try {
      store.dispatch(setLoading());
      const res = (await axios.post(
        "/api/users",
        userData
      )) as IResponseLoadUser;

      const { id, username } = res.user;
      store.dispatch(setUser({ id, username }));
    } catch (err) {
      if (err instanceof AxiosError) {
        store.dispatch(setError(err.response?.data.msg));
        console.log(err.response?.data.msg);
      } else {
        console.log(err);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { username: string; password: string }) => {
    try {
      store.dispatch(setLoading());

      const res = (await axios.post("/api/users/login", userData))
        .data as IResponseLoadUser;
      const { id, username, orders } = res.user;
      store.dispatch(setUser({ id, username }));
    } catch (err) {
      if (err instanceof AxiosError) {
        store.dispatch(setError(err.response?.data.msg));
        console.log(err.response?.data.msg);
      } else {
        console.log(err);
      }
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/api/users/logout");
    store.dispatch(logout());
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data.msg);
    } else {
      console.log(err);
    }
  }
});

//export reducer and state
export default authSlice.reducer;

export const isLoading = (state: RootState) => state.auth.isLoading;
export const authenticatedStatus = (state: RootState) =>
  state.auth.isAuthenticated;
export const userData = (state: RootState) => state.auth.user;
export const userError = (state: RootState) => state.auth.error;
