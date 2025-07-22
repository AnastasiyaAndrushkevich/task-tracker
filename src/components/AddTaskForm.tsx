import { useEffect, useState } from "react";
import TaskPoint from "./TaskPoint";
import { TaskType } from "../types";
import Button from "./Button";

type AddTaskFormProps = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export default function AddTaskForm({ tasks, setTasks }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTasks = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
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
