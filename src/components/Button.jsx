import "./Button.css";

export default function Button({ onClick }) {
  return (
    <button className="button" onClick={onClick}>
      Add task
    </button>
  );
}
