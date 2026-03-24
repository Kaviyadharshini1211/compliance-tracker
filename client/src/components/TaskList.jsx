import axios from "axios";
import "../styles/TaskList.css";

const TaskList = ({ tasks, filters, search, sortBy, refreshTasks }) => {

  const isOverdue = (task) =>
    task.status === "Pending" && new Date(task.due_date) < new Date();

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.category && task.category !== filters.category) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "due_date") return new Date(a.due_date) - new Date(b.due_date);
    return 0;
  });

  const toggleStatus = async (task) => {
    try {
      await axios.put(`https://compliance-tracker-1-nvx9.onrender.com/api/tasks/${task._id}`, {
        status: task.status === "Pending" ? "Completed" : "Pending",
      });
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  if (!sortedTasks.length) {
    return <p className="task-list-empty">No tasks found</p>;
  }

  return (
    <div>
      {sortedTasks.map((task) => (
        <div
          key={task._id}
          className={`task-card ${isOverdue(task) ? "overdue" : ""}`}
        >
          <div className="task-card-header">
            <h4 className="task-title">{task.title}</h4>

            <button
              className={`task-toggle-btn ${task.status === "Completed" ? "completed" : "pending"}`}
              onClick={() => toggleStatus(task)}
            >
              {task.status}
            </button>
          </div>

          <div className="task-meta">
            <div className="task-meta-item">
              Category: <span>{task.category || "N/A"}</span>
            </div>
            <div className="task-meta-item">
              Due: <span>{task.due_date?.slice(0, 10)}</span>
            </div>
            {isOverdue(task) && (
              <span className="task-overdue-badge">Overdue</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;