import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';
import { getAuth } from 'firebase/auth';

const initialState = {
  users: [],
  employees: [],
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

export const getEmployees = createAsyncThunk(
  'user/getEmployees',
  async (_, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await userAPI.getEmployees(token);
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

export const disableUser = createAsyncThunk(
  'user/disableUser',
  async (uid, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await userAPI.disableUser(uid, token);
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

export const enableUser = createAsyncThunk(
  'user/enableUser',
  async (uid, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await userAPI.enableUser(uid, token);
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
      // reducers for getEmployees
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
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
      })
      // reducers for disableUser
      .addCase(disableUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(disableUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(disableUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // reducers for enableUser
      .addCase(enableUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(enableUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(enableUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
