import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';
import { getAuth } from 'firebase/auth';

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await userAPI.getAllUsers(token);
      return data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await userAPI.createUser(user, token);
      return data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reducers for getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // reducers for createUser
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
