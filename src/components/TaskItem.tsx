import React from "react";
import { TaskType } from "../types";
import Button from "./Button";

type TaskItemProps = {
  task: TaskType;
  index: number;
  isEditing: boolean;
  editedText: string;
  onChangeEditedText: (text: string) => void;
  onToggleDone: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const TaskItem = ({
  task,
  index,
  isEditing,
  editedText,
  onChangeEditedText,
  onToggleDone,
  onDelete,
  onEdit,
  onSave,
  onCancel,
}: TaskItemProps) => {
  return (
    <li className="list">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => onChangeEditedText(e.target.value)}
          />
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={task.done} onChange={onToggleDone} />
          <span>{task.text}</span>
          <Button onClick={onDelete}>Delete</Button>
          <Button onClick={onEdit}>Edit</Button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
