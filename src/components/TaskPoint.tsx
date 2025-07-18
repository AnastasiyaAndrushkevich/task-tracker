/*
import { useEffect, useState } from "react";
import "./TaskPoint.css";
import { TaskType } from "../types";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";

export default function TaskPoint() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("myTasks"); //достать из браузера (localStorage) значение под именем майТаскс и сохранить это в переменную saved
    return saved ? (JSON.parse(saved) as TaskType[]) : []; //иф saved  есть превращаем в массив JSON.parse, иф пустой массив
  });
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks)); //сохраняет в браузер localStorage.setItem(), превращает массив в строку JSON.stringify(tasks)
  }, [tasks]);

  const [editIndex, setEditIndex] = useState<number | null>(null); //какая задача редактируется
  const [editedTask, setEditedTask] = useState<string>(""); //ее новое значение

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

  const toggleDone = (indexToToggle: number) => {
    const updated = [...tasks]; //копия массива
    updated[indexToToggle].done = !updated[indexToToggle].done; //переключаем true/false
    setTasks(updated);
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleDeleteCompleted = () => {
    const remaining = tasks.filter((tasks: TaskType) => !tasks.done);
    setTasks(remaining);
  };
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
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
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onDeleteCompleted={handleDeleteCompleted}
      />
      <div className="filters"></div>
      <ul>
        {filteredTasks.map((item, index: number) => (
          <TaskItem
            key={index}
            task={item}
            index={index}
            isEditing={editIndex === index}
            editedText={editedTask}
            onChangeEditedText={setEditedTask}
            onToggleDone={() => toggleDone(index)}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(index)}
            onSave={() => handleSaveEdit(index)}
            onCancel={() => setEditIndex(index)}
          />
        ))}
      </ul>
      <AddTaskForm tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
*/

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  deleteCompleted,
  deleteTask,
  toggleDone,
  startEdit,
  cancelEdit,
  changeEditedText,
  saveEdit,
} from "../store/tasksSlice";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";

export default function TaskPoint() {
  const dispatch = useDispatch();
  const { tasks, editIndex, editedText, filter, searchTerm } = useSelector(
    (state: RootState) => state.tasks
  );

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
      <ul>
        {filteredTasks.map((item, index) => (
          <TaskItem
            key={index}
            task={item}
            index={index}
            isEditing={editIndex === index}
            editedText={editedText}
            onChangeEditedText={(text) => dispatch(changeEditedText(text))}
            onToggleDone={() => dispatch(toggleDone(index))}
            onDelete={() => dispatch(deleteTask(index))}
            onEdit={() => dispatch(startEdit(index))}
            onSave={() => dispatch(saveEdit(index))}
            onCancel={() => dispatch(cancelEdit())}
          />
        ))}
      </ul>
      <AddTaskForm />
    </div>
  );
}
