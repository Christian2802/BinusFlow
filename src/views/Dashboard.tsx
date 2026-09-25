import React, { useState, useEffect } from "react";
import tasksData, { type Task } from "../data/task";
import styles from "./Dashboard.module.css";
import TaskCard from "../components/TaskCard";
import todo from "../assets/todo.png";
import inProgress from "../assets/inProgress.png";
import done from "../assets/done.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";
import Modal from "../components/Modal";
import ColorDropdown from "../components/ColorDropDown";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : tasksData;
  });
  const [colors, setColors] = useState<string[]>(() => {
    const storedColors = localStorage.getItem("colors");
    return storedColors ? JSON.parse(storedColors) : ["#f0f0f0", "#ff0000", "#00ff00"];
  });

  const [newTask, setNewTask] = useState<Task | null>(null);
  const [query, setQuery] = useState<String>("");

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToView, setTaskToView] = useState<Task | null>(null);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDelAllModal, setOpenDelAllModal] = useState<boolean>(false);
  const [openDelModal, setOpenDelModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "inProgress");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  const addTask = (
    title: string,
    description: string,
    status: "todo" | "inProgress" | "done",
    color: string
  ) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status,
      color,
    };
    setTasks([...tasks, newTask]);
  };

  const handleSelectTask = (task: Task) => {
    if (selectedTaskId !== task.id) {
      setSelectedTaskId(task.id);
      return;
    }

    setTaskToView(task);
    setOpenViewModal(true);
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setOpenDelModal(true);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((t) => t.id !== taskToDelete?.id));
    setOpenDelModal(false);
    setSelectedTaskId(null);
  };

  const handleDelAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
    setOpenDelAllModal(false);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    const id = Number(e.dataTransfer.getData("taskId"));
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setSelectedTaskId(null);
  };

  const handleClickAdd = () => {
    if (
      newTask &&
      newTask.title.trim() &&
      newTask.description.trim() &&
      newTask.status.trim() &&
      newTask.color.trim()
    ) {
      addTask(newTask.title, newTask.description, newTask.status, newTask.color);
      setNewTask(null);
      setOpenAddModal(false);
    } else {
      alert("Please fill the fields correctly");
    }
  };

  const handleChangeTitle = (title: string) =>
    setNewTask((prev) => ({ ...(prev || { id: 0, description: "", status: "todo", color: "" }), title }));

  const handleChangeDesc = (description: string) =>
    setNewTask((prev) => ({ ...(prev || { id: 0, title: "", status: "todo", color: "" }), description }));

  const handleChangeStatus = (status: Task["status"]) =>
    setNewTask((prev) => ({ ...(prev || { id: 0, title: "", description: "", color: "" }), status }));

  const handleChangeColor = (color: string) =>
    setNewTask((prev) => ({ ...(prev || { id: 0, title: "", description: "", status: "todo" }), color }));

  const modals = [
    {
      open: openAddModal,
      content: (
        <div className={styles.addModal}>
          <div className={styles.addModalHeader}>
            <div className={styles.label}>Status</div>
            <select onChange={(e) => handleChangeStatus(e.target.value as Task["status"])}>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className={styles.label}>Color</div>
            <ColorDropdown
              colors={colors}
              selectedColor={newTask?.color || colors[0]}
              onChange={handleChangeColor}
            />
          </div>

          <div className={styles.body}>
            <div>
              <div className={styles.label}>Title</div>
              <input type="text" placeholder="Task Title" onChange={(e) => handleChangeTitle(e.target.value)} />
            </div>

            <div>
              <div className={styles.label}>Description</div>
              <textarea placeholder="Task Description" onChange={(e) => handleChangeDesc(e.target.value)} />
            </div>
          </div>

          <div className={styles.addModalFooter}>
            <button className={styles.btnCancel} onClick={() => setOpenAddModal(false)}>
              Cancel
            </button>
            <button className={styles.btnSave} onClick={handleClickAdd}>
              Save
            </button>
          </div>
        </div>
      ),
    },
    {
      open: openDelAllModal,
      content: (
        <div className={styles.DelAllModal}>
          <div className={styles.label}>
            Are you sure you want to delete all tasks?{" "}
            <span style={{ color: "red" }}>This action cannot be undone</span>
          </div>
          <div className={styles.DelAllModalFooter}>
            <button className={styles.btnCancel} onClick={() => setOpenDelAllModal(false)}>
              Cancel
            </button>
            <button className={styles.btnDelete} onClick={handleDelAll}>
              Delete
            </button>
          </div>
        </div>
      ),
    },
    {
      open: openDelModal,
      content: (
        <div className={styles.DelModal}>
          <div className={styles.label}>
            Are you sure you want to delete this task?
          </div>
          <div className={styles.task}>
            {taskToDelete?.title}
          </div>
          <div className={styles.DelAllModalFooter}>
            <button className={styles.btnCancel} onClick={() => setOpenDelModal(false)}>
              Cancel
            </button>
            <button className={styles.btnDelete} onClick={deleteTask}>
              Delete
            </button>
          </div>
        </div>
      ),
    },
    {
      open: openViewModal,
      content: (
        <div className={styles.addModal}>
          <div className={styles.addModalHeader}>
            <div className={styles.label}>Status</div>
            <select className={styles.viewModalSelect} disabled>
              <option>{taskToView?.status}</option>
            </select>
          </div>

          <div className={styles.body}>
            <div>
              <div className={styles.label}>Title</div>
              <input type="text" value={taskToView?.title} disabled/>
            </div>

            <div>
              <div className={styles.label}>Description</div>
              <textarea disabled>{taskToView?.description}</textarea>
            </div>
          </div>

          <div className={styles.addModalFooter}>
            <button className={styles.btnSave} onClick={() => setOpenViewModal(false)}>
              Close
            </button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />

        <div className={styles.headerButtons}>
          <button className={styles.addBtn} onClick={() => setOpenAddModal(true)}>
            <img src={plus} alt="plus" /> Add
          </button>
          <button className={styles.discardBtn} onClick={() => setOpenDelAllModal(true)}>
            <img src={trash} alt="trash" /> Discard All
          </button>
        </div>
      </div>

      <div className={styles.listWrapper}>
        <div className={styles.listColumn}>
          <h3>
            <img src={todo} alt="todo" /> To Do
          </h3>
          <div
            className={styles.listCard}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            {todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={{
                  ...task,
                  color: colors.includes(task.color) ? task.color : "#cccccc"
                }}
                selected={task.id === selectedTaskId}
                onClick={() => handleSelectTask(task)}
                onDelete={() => openDeleteModal(task)}
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id.toString())}
              />
            ))}
          </div>
        </div>
        <div className={styles.listColumn}>
          <h3>
            <img src={inProgress} alt="inProgress" /> In Progress
          </h3>
          <div
            className={styles.listCard}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "inProgress")}
          >
            {inProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={{
                  ...task,
                  color: colors.includes(task.color) ? task.color : "#cccccc"
                }}
                selected={task.id === selectedTaskId}
                onClick={() => handleSelectTask(task)}
                onDelete={() => openDeleteModal(task)}
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id.toString())}
              />
            ))}
          </div>
        </div>
        <div className={styles.listColumn}>
          <h3>
            <img src={done} alt="done" /> Done
          </h3>
          <div
            className={styles.listCard}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "done")}
          >
            {doneTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={{
                  ...task,
                  color: colors.includes(task.color) ? task.color : "#cccccc"
                }}
                selected={task.id === selectedTaskId}
                onClick={() => handleSelectTask(task)}
                onDelete={() => openDeleteModal(task)}
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id.toString())}
              />
            ))}
          </div>
        </div>
      </div>
      {modals.map((m, idx) => (m.open ? <Modal key={idx} open={true}>{m.content}</Modal> : null))}
    </div>
  );
};

export default Dashboard;