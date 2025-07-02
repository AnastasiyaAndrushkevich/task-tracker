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

  const handleDelete = (indexToRemove) => {
    const updateTasks = tasks.filter((tasks, index) => index !== indexToRemove);
    setTasks(updateTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTask = [...tasks]; //...оператор спред н расскалывает эл-ты массива, создает новый массив копию
    updatedTask[index] = editedTask; //изменили эл-т в копии
    setTasks(updatedTask); //обновили State
    setEditIndex(null);
  };

  const handleAddTasks = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  return (
    <div className="app-container">
      <ul>
        {tasks.map((item, index) => (
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
                <span>{item}</span>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </li> //"Возьми каждый item из list, и для каждого создай <li>{item}</li>"
        ))}
      </ul>
      <ul>
        {/* {!showInput && (
          <button onClick={() => setShowInput(true)}>Add task</button>
        )} */}
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
