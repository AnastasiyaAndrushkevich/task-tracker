import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = { text: string; done: boolean };

type TasksState = {
  tasks: Task[];
  editIndex: number | null;
  editedText: string;
  filter: 'all' | 'active' | 'done';
  searchTerm: string;
};

const initialState: TasksState = {
  tasks: [],
  editIndex: null,
  editedText: '',
  filter: 'all',
  searchTerm: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({ text: action.payload, done: false });
    },
    toggleDone(state, action: PayloadAction<number>) {
      state.tasks[action.payload].done = !state.tasks[action.payload].done;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks.splice(action.payload, 1);
    },
    deleteCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.done);
    },
    startEdit(state, action: PayloadAction<number>) {
      state.editIndex = action.payload;
      state.editedText = state.tasks[action.payload].text;
    },
    cancelEdit(state) {
      state.editIndex = null;
    },
    changeEditedText(state, action: PayloadAction<string>) {
      state.editedText = action.payload;
    },
    saveEdit(state, action: PayloadAction<number>) {
      state.tasks[action.payload].text = state.editedText;
      state.editIndex = null;
      state.editedText = '';
    },
    setFilter(state, action: PayloadAction<'all' | 'active' | 'done'>) {
      state.filter = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTask,
  toggleDone,
  deleteTask,
  deleteCompleted,
  startEdit,
  cancelEdit,
  changeEditedText,
  saveEdit,
  setFilter,
  setSearchTerm,
} = tasksSlice.actions;

export default tasksSlice.reducer;
