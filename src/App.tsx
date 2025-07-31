import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import "./App.css";
import Header from "./components/Header/Header";
import TaskPoint from "./components/TaskPoint/TaskPoint";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/tasks" element={<TaskPoint />} />
    </Routes>
  );
}
export default App;
