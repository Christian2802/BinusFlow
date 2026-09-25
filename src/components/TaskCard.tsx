import React from "react";
import { type Task } from "../data/task";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  selected,
  onClick,
  onDelete,
  onDragStart,
}) => {
  return (
    <div
      className={`${styles.taskCard} ${selected ? styles.selected : ""}`}
      style={{ backgroundColor: task.color }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      {selected && (
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}

      <h4>{task.title}</h4>
    </div>
  );
};

export default TaskCard;
