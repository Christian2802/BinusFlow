interface Task{
    id: number;
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
    color: string;
}

export type {Task};

const taskList: Task[] = [
    { id: 1, title: "Sample 1", description: "Description 1", status: "todo", color: "#f6ff47" },
    { id: 2, title: "Sample 2", description: "Description 2", status: "done", color: "#25df5a" },
    { id: 3, title: "Sample 3", description: "Description 3", status: "inProgress", color: "#ff3ad8" },
    { id: 4, title: "Sample 4", description: "Description 4", status: "inProgress", color: "#ff2c2c" },
    { id: 5, title: "Sample 5", description: "Description 5", status: "done", color: "#32fbe3" },
    { id: 6, title: "Sample 6", description: "Description 6", status: "done", color: "#4b4b4b" },
]

export default taskList;