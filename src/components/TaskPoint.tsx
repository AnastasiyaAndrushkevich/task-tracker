import { useEffect } from "react";
import "./TaskPoint.css";
import TaskList from "./TaskList";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import AddTaskForm from "./AddTaskForm";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  toggleDone,
  deleteTask,
  startEdit,
  cancelEdit,
  changeEditedText,
  saveEdit,
  deleteCompleted,
  setFilter,
  setSearchTerm,
} from "../store/tasksSlice";

export default function TaskPoint() {
  const dispatch = useDispatch();
  const { tasks, filter, searchTerm } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  return (
    <div className="app-container">
      <TaskFilter />
      <TaskList />
      <AddTaskForm />
    </div>
  );
}
