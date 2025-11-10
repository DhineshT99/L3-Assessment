import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi } from "../api/users-api";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await fetchUsersApi(query);
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const usersReducer = usersSlice.reducer;
