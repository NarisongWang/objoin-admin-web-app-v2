import { configureStore } from '@reduxjs/toolkit';
import installationOrderReducer from '../features/installationOrder/installationOrderSlice';
import salesOrderReducer from '../features/salesOrder/salesOrderSlice';
import userReducer from '../features/user/userSlice';
import systemReducer from '../features/system/systemSlice';

export const store = configureStore({
  reducer: {
    installationOrder: installationOrderReducer,
    salesOrder: salesOrderReducer,
    user: userReducer,
    system: systemReducer,
  },
});
