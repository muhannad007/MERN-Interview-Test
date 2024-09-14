const mongoose = require("mongoose");

const schema = mongoose.Schema;

const drawingSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Drawing = mongoose.model("drawing", drawingSchema);

module.exports = Drawing;
