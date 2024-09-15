import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const DrawRect = () => {
  const [rectangles, setRectangles] = useState([]);
  const [newRectangle, setNewRectangle] = useState([]);

  const handleMouseDown = (event) => {
    if (newRectangle.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectangle([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newRectangle.length === 1) {
      const sx = newRectangle[0].x;
      const sy = newRectangle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const rectangleToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: rectangles.length + 1,
      };
      rectangles.push(rectangleToAdd);
      setNewRectangle([]);
      setRectangles(rectangles);
    }
  };

  const handleMouseMove = (event) => {
    if (newRectangle.length === 1) {
      const sx = newRectangle[0].x;
      const sy = newRectangle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectangle([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  const rectanglesToDraw = [...rectangles, ...newRectangle];
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={900}
      height={700}
    >
      <Layer>
        {rectanglesToDraw.map((value) => {
          return (
            <Rect
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="transparent"
              stroke="black"
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default DrawRect;
