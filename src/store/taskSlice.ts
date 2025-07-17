
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = { text: string; done: boolean };

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.push({ text: action.payload, done: false });
    },
    toggleDone: (state, action: PayloadAction<number>) => {
      state[action.payload].done = !state[action.payload].done;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addTask, toggleDone, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;