import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import "../styles/Tasks.css";

const Tasks = ({ clientId }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchTasks = () => {
    if (clientId) {
      axios
        .get(`https://compliance-tracker-1-nvx9.onrender.com/api/tasks/${clientId}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clientId]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const overdue = tasks.filter(
    (t) => t.status === "Pending" && new Date(t.due_date) < new Date()
  ).length;

  return (
    <div className="tasks-container">
      <h2>{clientId ? "Tasks" : "Select a client to view tasks"}</h2>

      {clientId && (
        <div className="tasks-summary">
          <div className="summary-card">
            <div className="label">Total</div>
            <div className="value">{total}</div>
          </div>
          <div className="summary-card">
            <div className="label">Pending</div>
            <div className="value">{pending}</div>
          </div>
          <div className="summary-card">
            <div className="label">Completed</div>
            <div className="value">{completed}</div>
          </div>
          <div className="summary-card overdue">
            <div className="label">Overdue</div>
            <div className="value">{overdue}</div>
          </div>
        </div>
      )}

      <div className="tasks-controls">
        <input
          className="tasks-search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="tasks-sort"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="">Sort</option>
          <option value="due_date">Due Date</option>
        </select>
      </div>

      <Filters setFilters={setFilters} />

      <TaskList
        tasks={tasks}
        filters={filters}
        search={search}
        sortBy={sortBy}
        refreshTasks={fetchTasks}
      />

      <TaskForm clientId={clientId} refreshTasks={fetchTasks} />
    </div>
  );
};

export default Tasks;