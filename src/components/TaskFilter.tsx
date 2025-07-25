import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setFilter,
  setSearchTerm,
  deleteCompleted,
  setSortBy,
} from "../store/tasksSlice";

export default function TaskFilter() {
  const dispatch = useDispatch();
  const { filter, searchTerm, sortBy } = useSelector(
    (state: RootState) => state.tasks
  );
  //const sortBy = useSelector((state: RootState) => state.tasks.sortBy);

  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) =>
          dispatch(
            setSortBy(
              e.target.value as "default" | "unfinishedFirst" | "newestFirst"
            )
          )
        }
      >
        <option value="default">Default</option>
        <option value="unfinishedFirst">Unfinished first</option>
        <option value="newestFirst">Newest first</option>
      </select>
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
        Delete Completed
      </button>
    </div>
  );
}
