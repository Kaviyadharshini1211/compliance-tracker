import { useState } from "react";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        borderRight: "1px solid #ddd",
        padding: "20px",
        background: "#f9fafb"
      }}>
        <h2>Clients</h2>
        <Clients setSelectedClient={setSelectedClient} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Tasks clientId={selectedClient} />
      </div>

    </div>
  );
}

export default App;