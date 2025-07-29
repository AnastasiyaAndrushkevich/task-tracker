import { useEffect } from "react";
import "./TaskPoint.css";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";
import AddTaskForm from "../AddTaskFilter/AddTaskForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { TaskType } from "../../types";

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

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "done") return task.done;
      if (filter === "active") return !task.done;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="app-container">
      <TaskFilter />
      <TaskList />
      <AddTaskForm />
    </div>
  );
}
