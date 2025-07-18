import { useEffect, useState } from "react";
import Button from "./Button";
import { TaskType } from "../types";

type TaskFilterProps = {
  filter: "all" | "active" | "done";
  setFilter: (filter: "all" | "active" | "done") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onDeleteCompleted: () => void;
};

const TaskFilter: React.FC<TaskFilterProps> = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  onDeleteCompleted,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  return (
    <div className="filters">
      <Button onClick={() => setFilter("all")}>All</Button>
      <Button onClick={() => setFilter("active")}>Active</Button>
      <Button onClick={() => setFilter("done")}>Done</Button>
      <Button onClick={onDeleteCompleted}>Delete completed</Button>
      <input
        type="text"
        placeholder="Search task"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};

export default TaskFilter;
