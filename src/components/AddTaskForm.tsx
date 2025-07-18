import React from "react";

import { useState } from "react";
import { TaskType } from "../types";
import Button from "./Button";
import { addTask } from "../store/tasksSlice";
import { useDispatch } from "react-redux";

// type AddTaskFormProps = {
//   tasks: TaskType[];
//   setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
// };

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
