import "./TaskPoint.css";

export default function TaskPoint() {
  const tasks = ["Task 1", "Task 2", "Task 3"];

  return (
    <ul>
      {tasks.map((item, index) => (
        <li className="list" key={index}>
          <span>{item}</span> <button>Delete</button>
        </li> //"Возьми каждый item из list, и для каждого создай <li>{item}</li>"
      ))}
    </ul>
  );
}
