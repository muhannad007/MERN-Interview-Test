import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const DrawCircle = ({ stageRef }) => {
  const [circles, setCircles] = useState([]);
  const [newcircle, setNewCircle] = useState([]);

  const handleMouseDown = (event) => {
    if (newcircle.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewCircle([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newcircle.length === 1) {
      const sx = newcircle[0].x;
      const sy = newcircle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const circleToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: circles.length + 1,
      };
      circles.push(circleToAdd);
      setNewCircle([]);
      setCircles(circles);
    }
  };

  const handleMouseMove = (event) => {
    if (newcircle.length === 1) {
      const sx = newcircle[0].x;
      const sy = newcircle[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewCircle([
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

  const circlesToDraw = [...circles, ...newcircle];
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

export default DrawCircle;
