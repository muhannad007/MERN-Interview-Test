const express = require("express");
const controllers = require("../controllers/drawingController");

const router = express.Router();

router.get("/", controllers.getAllDrawing);

router.get("/:id", controllers.getDrawing);

router.post("/", controllers.createDrawing);

router.delete("/:id", controllers.deleteDrawing);

router.patch("/:id", controllers.updateDrawing);

module.exports = router;
