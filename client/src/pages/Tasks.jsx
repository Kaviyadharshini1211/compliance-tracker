import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";

const Tasks = ({ clientId }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});

  // ✅ fetch function (reusable)
  const fetchTasks = () => {
    if (clientId) {
      axios
        .get(`http://localhost:5000/api/tasks/${clientId}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clientId]);

  return (
    <div style={{ flex: 1 }}>
      <h2>
        {clientId ? "Tasks" : "Select a client to view tasks"}
      </h2>

      <Filters setFilters={setFilters} />

      <TaskList
        tasks={tasks}
        filters={filters}
        refreshTasks={fetchTasks}   // ✅ pass refresh
      />

      <TaskForm
        clientId={clientId}
        refreshTasks={fetchTasks}   // ✅ pass refresh
      />
    </div>
  );
};

export default Tasks;