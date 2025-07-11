import { useEffect, useState } from "react";
import "./TaskPoint.css";
import Button from "./Button";
import { TaskType } from "../types";

export default function TaskPoint() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("myTasks"); //достать из браузера (localStorage) значение под именем майТаскс и сохранить это в переменную saved
    return saved ? (JSON.parse(saved) as TaskType[]) : []; //иф saved  есть превращаем в массив JSON.parse, иф пустой массив
  });
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks)); //сохраняет в браузер localStorage.setItem(), превращает массив в строку JSON.stringify(tasks)
  }, [tasks]);

  const [newTask, setNewTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null); //какая задача редактируется
  const [editedTask, setEditedTask] = useState<string>(""); //ее новое значение
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const handleDelete = (indexToRemove: number) => {
    const updateTasks = tasks.filter(
      (tasks, index: number) => index !== indexToRemove
    );
    setTasks(updateTasks);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleSaveEdit = (index: number) => {
    const updatedTask = [...tasks]; //...оператор спред расскалывает эл-ты массива, создает новый массив копию
    updatedTask[index] = { ...updatedTask[index], text: editedTask }; //изменили эл-т в копии
    setTasks(updatedTask); //обновили State
    setEditIndex(null);
  };

  const handleAddTasks = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleDone = (indexToToggle: number) => {
    const updated = [...tasks]; //копия массива
    updated[indexToToggle].done = !updated[indexToToggle].done; //переключаем true/false
    setTasks(updated);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "done") return task.done;
      if (filter === "active") return !task.done;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

  const handleDeleteCompleted = () => {
    const remaining = tasks.filter((tasks: TaskType) => !tasks.done);
    setTasks(remaining);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="app-container">
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={handleDeleteCompleted}>Delete comleted</button>
        <input
          type="text"
          placeholder="Search task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredTasks.map((item, index: number) => (
          <li className="list" key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Canel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleDone(index)}
                />
                <span>{item.text}</span>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter the task"
      />
      <Button onClick={handleAddTasks} />
    </div>
  );
}
