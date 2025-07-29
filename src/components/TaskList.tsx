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
import { TaskType } from "../types";

type TaskListProps = {
  tasks: TaskType[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  const dispatch = useDispatch();
  const { editIndex, editedText } = useSelector(
    (state: RootState) => state.tasks
  );

  // const filteredTasks = tasks
  //   .filter((task) => {
  //     if (filter === "done") return task.done;
  //     if (filter === "active") return !task.done;
  //     return true;
  //   })
  //   .filter((task) =>
  //     task.text.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <>
      {tasks.map((task, index) => (
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
