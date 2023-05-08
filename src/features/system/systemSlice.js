import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMenu: 'Dashboard', // initial value of selected menu
};

const menuSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { setSelectedMenu } = menuSlice.actions;

export default menuSlice.reducer;
