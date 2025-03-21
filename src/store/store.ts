import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slices/toggle";

// Redux Store
export const AppStore = configureStore({
  reducer: {
    task: TaskReducer,
  },
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export default AppStore;
