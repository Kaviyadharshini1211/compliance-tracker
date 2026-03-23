const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    country: String,
    entity_type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);