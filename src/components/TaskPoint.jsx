import { useEffect, useState } from "react";
import "./TaskPoint.css";
import Button from "./Button";

export default function TaskPoint() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks"); //достать из браузера (localStorage) значение под именем майТаскс и сохранить это в переменную saved
    return saved ? JSON.parse(saved) : []; //иф saved  есть превращаем в массив JSON.parse, иф пустой массив
  });
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks)); //сохраняет в браузер localStorage.setItem(), превращает массив в строку JSON.stringify(tasks)
  }, [tasks]);

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null); //какая задача редактируется
  const [editedTask, setEditedTask] = useState(""); //ее новое значение
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleDelete = (indexToRemove) => {
    const updateTasks = tasks.filter((tasks, index) => index !== indexToRemove);
    setTasks(updateTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleSaveEdit = (index) => {
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

  const toggleDone = (indexToToggle) => {
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

  const handlDeleteCompleted = () => {
    const remaining = tasks.filter((tasks) => !tasks.done);
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
        <button onClick={handlDeleteCompleted}>Delete comleted</button>
        <input
          type="text"
          placeholder="Search task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredTasks.map((item, index) => (
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
