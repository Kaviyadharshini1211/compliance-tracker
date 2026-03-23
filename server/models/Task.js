const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    due_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);