import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";

export default function AddTaskForm() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTasks = () => {
    if (newTask.trim() === "") return;
    dispatch(addTask(newTask));
    setNewTask("");
  };
  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter the task"
      />
      <Button onClick={handleAddTasks}>Add new task</Button>
    </div>
  );
}
