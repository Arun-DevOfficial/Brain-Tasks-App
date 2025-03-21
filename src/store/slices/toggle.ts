import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskTypes } from "../../types/taskTypes";

// Define initial state type
interface TaskState {
  tasks: taskTypes[];
}

// Initial state
const initialState: TaskState = {
  tasks: [],
};

// Store Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<taskTypes[]>) => {
      state.tasks = action.payload; 
    },
  },
});

// Export actions and reducer
export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
