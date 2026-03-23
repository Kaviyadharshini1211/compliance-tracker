import axios from "axios";

const TaskList = ({ tasks, filters, refreshTasks }) => {

  const isOverdue = (task) => {
    return (
      task.status === "Pending" &&
      new Date(task.due_date) < new Date()
    );
  };

  // ✅ apply filters
  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.category && task.category !== filters.category) return false;
    return true;
  });

  const toggleStatus = async (task) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        status: task.status === "Pending" ? "Completed" : "Pending",
      });

      refreshTasks(); // ✅ no reload
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ empty state
  if (!filteredTasks.length) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      {filteredTasks.map(task => (
        <div
          key={task._id}
          style={{
            border: "1px solid #e5e7eb",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
            background: isOverdue(task) ? "#fee2e2" : "#ffffff"
          }}
        >
          <h4>{task.title}</h4>
          <p><strong>Category:</strong> {task.category || "N/A"}</p>
          <p>Due: {task.due_date?.slice(0, 10)}</p>

          <button onClick={() => toggleStatus(task)}>
            {task.status}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;