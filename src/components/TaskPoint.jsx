import { useState } from "react";
import "./TaskPoint.css";
import Button from "./Button";

export default function TaskPoint() {
  const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editIndex, setEditIndex] = useState(null); //какая азадача редактируется
  const [editedTask, setEditedTask] = useState(""); //ее новое значение

  const handleDelete = (indexToRemove) => {
    const updateTasks = tasks.filter((tasks, index) => index !== indexToRemove);
    setTasks(updateTasks);
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
            <span>{item}</span>
            <button onClick={() => handleDelete(index)}>Delete</button>
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

// export default function Card(props) {
//   const [list, setList] = useState("milk");
//   function handleClick() {
//     setList("apple");
//   }
//   return (
//     <>
//       <p>{list}</p>
//       <button onClick={handleClick}>push me</button>
//     </>
//   );
// }
