import { useState, useEffect } from "react";
import "./App.css";
import type { Task, TaskStatus } from "../../backend/src/types/task.js";
// interface Task {
//   id: string;
//   taskText: string;
//   status: string;
// }
interface SublistProps {
  type: TaskStatus;
  taskList: Task[];
  onMove: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, editText: string) => void;
}
function Sublist({ type, taskList, onMove, onDelete, onEdit }: SublistProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  function handleStartEdit(task: Task) {
    setEditingId(task.id);
    setEditText(task.task_title);
  }
  function handleSaveEdit(id: string) {
    onEdit(id, editText);
    setEditText("");
    setEditingId(null);
  }
  function handleCancelEdit() {
    setEditText("");
    setEditingId(null);
  }
  return (
    <div className="task-list">
      {taskList.length > 0 ? (
        <ul>
          {taskList.map((task) => {
            return (
              <>
                <li key={task.id}>
                  {editingId === task.id ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <button onClick={() => handleSaveEdit(task.id)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <div>{task.task_title}</div>
                      <button onClick={() => handleStartEdit(task)}>
                        Edit
                      </button>
                      <button onClick={() => onDelete(task.id)}>Remove</button>
                      {type !== "COMPLETED" && (
                        <button onClick={() => onMove(task)}>Move</button>
                      )}
                    </>
                  )}
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        "Nothing to see here..."
      )}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/user");
        if (!res.ok) {
          throw new Error("Unable to fetch data");
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
  function handleNewItemTextChange(e) {
    setNewItemText(e.target.value);
  }

  async function handleNewItemSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({
        task_title: newItemText,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to add task");
    }
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setNewItemText("");
  }

  function onDelete(id: string) {
    console.log("Deleting task:", id);
    // TODO: Delete task from backend
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function onMove(movedTask: Task) {
    console.log("Moving task:", movedTask);
    // TODO: Move task to backend
    if (movedTask.status === "TODO") {
      setTasks(
        tasks.map((task) =>
          task.id === movedTask.id ? { ...task, status: "INPROG" } : task,
        ),
      );
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === movedTask.id ? { ...task, status: "COMPLETED" } : task,
        ),
      );
    }
  }

  function onEdit(id: string, editText: string) {
    console.log("Editing task:", id, editText);
    // TODO: Edit task in backend
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, taskText: editText } : task,
      ),
    );
  }

  console.log(isLoading, error);
  const todoTasks = tasks.filter((task) => task.status === "TODO");
  const inProgTasks = tasks.filter((task) => task.status === "INPROG");
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

  return (
    <>
      <h1>Task Board</h1>
      <h2>Keep Track of your Tasks!</h2>
      <form onSubmit={handleNewItemSubmit}>
        <label htmlFor="task">Add Tasks here:</label>
        <input
          id="task"
          type="text"
          value={newItemText}
          onChange={handleNewItemTextChange}
          placeholder="Enter a task..."
        />
        <button type="submit">Submit</button>
      </form>
      <div className="task-section">
        {" "}
        <Sublist
          type={"TODO"}
          taskList={todoTasks}
          onMove={onMove}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <Sublist
          type={"INPROG"}
          taskList={inProgTasks}
          onMove={onMove}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <Sublist
          type={"COMPLETED"}
          taskList={completedTasks}
          onMove={onMove}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </>
  );
}

export default App;
