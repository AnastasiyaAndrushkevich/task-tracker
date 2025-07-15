import { TaskType } from "../types";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: TaskType[];
  onToggleDone: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  editIndex: number | null;
  editedTask: string;
  setEditedTask: (value: string) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleDone,
  onDelete,
  onEdit,
  editIndex,
  editedTask,
  setEditedTask,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          isEditing={editIndex === index}
          editedText={editedTask}
          onChangeEditedText={setEditedTask}
          onToggleDone={() => onToggleDone(index)}
          onDelete={() => onDelete(index)}
          onEdit={() => onEdit(index)}
          onSave={() => onSaveEdit(index)}
          onCancel={onCancelEdit}
        />
      ))}
    </>
  );
};
export default TaskList;
