// const express = require("express");
const Drawing = require("../models/Drawing");

// Get all the drawings
const getAllDrawing = async (req, res) => {
  try {
    const drawings = await Drawing.find().sort({ createdAt: -1 });
    res.status(200).json(drawings);
    // if (!drawings) {
    //   res.status(400).json({ "error: ": "There is no drawings yet" });
    // }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single drawing
const getDrawing = async (req, res) => {
  const id = req.params.id;
  const drawing = await Drawing.findById(id);

  if (!drawing) {
    return res.status(404).json({ error: "No such drawing" });
  }
  res.status(200).json(drawing);
};

// Post a new drawing
// app.use('/images', express.static(path.join(__dirname, './public/images')));
const createDrawing = async (req, res) => {
  const { title, shape } = req.body;
  // path.join(shape, "./public/images");

  try {
    const drawing = await Drawing.create({ title, shape });
    res.status(200).json(drawing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a single drawing
const deleteDrawing = async (req, res) => {
  const id = req.params.id;
  const drawing = await Drawing.findOneAndDelete({ _id: id });

  if (!drawing) {
    return res.staute(404).json({ error: "No such drawing" });
  }

  res.status(200).json(drawing);
};

// Update a drawing
const updateDrawing = async (req, res) => {
  const id = req.params.id;

  const drawing = await Drawing.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!drawing) {
    return res.staute(404).json({ error: "No such drawing" });
  }

  res.status(200).json(drawing);
};

module.exports = {
  getAllDrawing,
  getDrawing,
  createDrawing,
  deleteDrawing,
  updateDrawing,
};
