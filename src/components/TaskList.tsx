import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  toggleDone,
  deleteTask,
  startEdit,
  saveEdit,
  cancelEdit,
  changeEditedText,
} from "../store/tasksSlice";
import TaskItem from "./TaskItem";
const TaskList = () => {
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
    <>
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
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
    </>
  );
};

export default TaskList;
