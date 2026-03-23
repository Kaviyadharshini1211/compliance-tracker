const express = require("express");
const router = express.Router();

const Client = require("../models/Client");
const { getClients } = require("../controllers/clientController");

// ✅ GET clients
router.get("/", getClients);

// ✅ ADD THIS (POST route)
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;