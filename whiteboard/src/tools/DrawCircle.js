import React, { useState } from "react";
import { Stage, Layer, Circle } from "react-konva";

const DrawCircle = ({ stageRef }) => {
  const [circles, setCircles] = useState([]);
  const [newCircle, setNewCircle] = useState([]);

  const handleMouseDown = (event) => {
    if (newCircle.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewCircle([{ x, y, redius: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newCircle.length === 1) {
      const sx = newCircle[0].x;
      const sy = newCircle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const circleToAdd = {
        x: sx,
        y: sy,
        radius: Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2)),
        key: circles.length + 1,
      };
      circles.push(circleToAdd);
      setNewCircle([]);
      setCircles(circles);
    }
  };

  const handleMouseMove = (event) => {
    if (newCircle.length === 1) {
      const sx = newCircle[0].x;
      const sy = newCircle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewCircle([
        {
          x: sx,
          y: sy,
          radius: Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2)),
          key: "0",
        },
      ]);
    }
  };

  const circlesToDraw = [...circles, ...newCircle];
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={800}
      height={400}
      ref={stageRef}
    >
      <Layer>
        {circlesToDraw.map((value) => {
          return (
            <Circle
              x={value.x}
              y={value.y}
              radius={value.radius}
              fill="transparent"
              stroke="back"
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default DrawCircle;
