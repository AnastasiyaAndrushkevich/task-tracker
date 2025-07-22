import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilter, setSearchTerm, deleteCompleted } from "../store/tasksSlice";

export default function TaskFilter() {
  const dispatch = useDispatch();
  const { filter, searchTerm } = useSelector((state: RootState) => state.tasks);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <button
        onClick={() => dispatch(setFilter("all"))}
        disabled={filter === "all"}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setFilter("active"))}
        disabled={filter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => dispatch(setFilter("done"))}
        disabled={filter === "done"}
      >
        Done
      </button>
      <button onClick={() => dispatch(deleteCompleted())}>
        delete Completed
      </button>
    </div>
  );
}
