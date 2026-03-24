import { useEffect, useState } from "react";
import axios from "axios";

const Clients = ({ setSelectedClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("https://compliance-tracker-1-nvx9.onrender.com/api/clients")
      .then(res => setClients(res.data));
  }, []);

  return (
    <div>
      <h2>Clients</h2>

      {clients.map(client => (
        <div
  key={client._id}
  onClick={() => setSelectedClient(client._id)}
  style={{
    cursor: "pointer",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    background: "#fff",
    border: "1px solid #eee",
    transition: "0.2s"
  }}
>
  {client.company_name}
</div>
      ))}
    </div>
  );
};

export default Clients;