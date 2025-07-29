import { useEffect } from "react";
import "./TaskPoint.css";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import AddTaskForm from "./AddTaskForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

export default function TaskPoint() {
  const dispatch = useDispatch();
  const { tasks, filter, searchTerm, sortBy } = useSelector(
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
    )
    .sort((a, b) => {
      if (sortBy === "unfinishedFirst") {
        return Number(a.done) - Number(b.done);
      }
      if (sortBy === "newestFirst") {
        return 0;
      }
      return 0;
    });

  return (
    <div className="app-container">
      <TaskFilter />
      <TaskList tasks={filteredTasks} />
      <AddTaskForm />
    </div>
  );
}
