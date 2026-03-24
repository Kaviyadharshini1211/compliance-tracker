import { useState } from "react";
import axios from "axios";
import "../styles/TaskForm.css";

const TaskForm = ({ clientId, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    if (!clientId) {
      alert("Please select a client first");
      return;
    }
    if (!title || !dueDate) {
      alert("Title and due date are required");
      return;
    }

    try {
      await axios.post("https://compliance-tracker-1-nvx9.onrender.com/api/tasks", {
        client_id: clientId,
        title,
        due_date: dueDate,
      });
      setTitle("");
      setDueDate("");
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-form">
      <h3>Add Task</h3>

      <div className="task-form-fields">
        <input
          className="task-form-input"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="task-form-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="task-form-btn" onClick={handleSubmit}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;