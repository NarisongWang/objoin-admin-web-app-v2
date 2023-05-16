import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import installationOrderAPI from './installationOrderAPI';
import { initFiles } from '../../utils/utils';
import { getAuth } from 'firebase/auth';

const initialState = {
  installationOrders: [],
  totalCount: 0,
  users: [],
  //this files state is used for installation order setup & edit
  files: [],
  isLoading: false,
  error: '',
};

export const getInstallationOrders = createAsyncThunk(
  'installationOrder/getInstallationOrders',
  async (queryParams, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await installationOrderAPI.getInstallationOrders(
        queryParams,
        token
      );
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

export const getTotalCount = createAsyncThunk(
  'installationOrder/getTotalCount',
  async (queryParams, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const data = await installationOrderAPI.getTotalCount(queryParams, token);
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

export const getUsersAndFiles = createAsyncThunk(
  'installationOrder/getUsersAndFiles',
  async (installationOrderId, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.getUsersAndFiles(
        installationOrderId,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeInstallationOrder = createAsyncThunk(
  'installationOrder/closeInstallationOrder',
  async (installationOrderId, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.closeInstallationOrder(
        installationOrderId,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteInstallationOrder = createAsyncThunk(
  'installationOrder/deleteInstallationOrder',
  async (installationOrderId, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.deleteInstallationOrder(
        installationOrderId,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const setupInstallationOrder = createAsyncThunk(
  'installationOrder/setupInstallationOrder',
  async (installationOrder, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.setupInstallationOrder(
        installationOrder,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editInstallationOrder = createAsyncThunk(
  'installationOrder/editInstallationOrder',
  async (installationOrder, thunkAPI) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      return await installationOrderAPI.editInstallationOrder(
        installationOrder,
        token
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const installationOrderSlice = createSlice({
  name: 'installationOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reducers for getInstallationOrders
      .addCase(getInstallationOrders.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getInstallationOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.installationOrders = action.payload;
      })
      .addCase(getInstallationOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // reducers for getTotalCount
      .addCase(getTotalCount.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getTotalCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getTotalCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //reducers for getUsersAndFiles
      .addCase(getUsersAndFiles.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUsersAndFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.files = action.payload.files;
      })
      .addCase(getUsersAndFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //reducers for setupInstallationOrder
      .addCase(setupInstallationOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setupInstallationOrder.fulfilled, (state, action) => {
        state.installationOrders = state.installationOrders.map(
          (installationOrder) => {
            if (installationOrder._id === action.payload._id) {
              return action.payload;
            }
            return installationOrder;
          }
        );
        state.isLoading = false;
      })
      .addCase(setupInstallationOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //reducers for editInstallationOrder
      .addCase(editInstallationOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInstallationOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editInstallationOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default installationOrderSlice.reducer;
