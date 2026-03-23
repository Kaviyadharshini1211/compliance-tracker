import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Clients.css";

const Clients = ({ setSelectedClient, selectedClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients")
      .then(res => setClients(res.data));
  }, []);

  return (
    <div className="clients-container">
      <h2>Clients</h2>

      {clients.map(client => (
        <div
          key={client._id}
          className={`client-item ${selectedClient === client._id ? "active" : ""}`}
          onClick={() => setSelectedClient(client._id)}
        >
          {client.company_name}
        </div>
      ))}
    </div>
  );
};

export default Clients;