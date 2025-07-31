import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Task Tracker</h1>
      <p>Your personal task manager</p>
      <Link to="/tasks" className="start-button">
        Start Tracking
      </Link>
    </div>
  );
};

export default WelcomePage;
