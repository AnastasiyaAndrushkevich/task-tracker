import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskType = {
  text: string;
  done: boolean;
};

type TasksState = {
  tasks: TaskType[];
  editIndex: number | null;
  editedText: string;
  filter: "all" | "active" | "done";
  searchTerm: string;
};

function getSafeLocalStorageItem<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    if (!value || value === "undefined") return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

const initialState: TasksState = {
  tasks: getSafeLocalStorageItem<TaskType[]>("myTasks", []),
  filter:
    (localStorage.getItem("filter") as "all" | "active" | "done") || "all",
  searchTerm: localStorage.getItem("searchTerm") || "",
  editIndex: null,
  editedText: "",
};


const tasksSlice = createSlice({
  name: "tasks",
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
    startEdit(state, action: PayloadAction<number>) {
      state.editIndex = action.payload;
      state.editedText = state.tasks[action.payload].text;
    },
    changeEditedText(state, action: PayloadAction<string>) {
      state.editedText = action.payload;
    },
    saveEdit(state, action: PayloadAction<number>) {
      if (state.editIndex !== null) {
        state.tasks[state.editIndex].text = state.editedText;
        state.editIndex = null;
        state.editedText = "";
      }
    },
    cancelEdit(state) {
      state.editIndex = null;
      state.editedText = "";
    },
    deleteCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.done);
    },
    setFilter(state, action: PayloadAction<"all" | "active" | "done">) {
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
  startEdit,
  changeEditedText,
  saveEdit,
  cancelEdit,
  deleteCompleted,
  setFilter,
  setSearchTerm,
} = tasksSlice.actions;

export default tasksSlice.reducer;
