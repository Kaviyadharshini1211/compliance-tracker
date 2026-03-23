import { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:5000/api/tasks", {
        client_id: clientId,
        title,
        due_date: dueDate,
      });

      // ✅ clear form
      setTitle("");
      setDueDate("");

      refreshTasks(); // ✅ no reload
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default TaskForm;