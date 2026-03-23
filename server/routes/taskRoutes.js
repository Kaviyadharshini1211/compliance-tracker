const express = require("express");
const router = express.Router();
const {
  getTasksByClient,
  createTask,
  updateTask,
} = require("../controllers/taskController");

router.get("/:clientId", getTasksByClient);
router.post("/", createTask);
router.put("/:id", updateTask);

module.exports = router;