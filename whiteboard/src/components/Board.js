import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import DrawRect from "../tools/DrawRect";
import DrawCircle from "../tools/DrawCircle";

const Board = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [title, setTitle] = useState("");
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  let layer = "";

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSubmit = async (title) => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    const data = { title: title, shape: uri };
    const res = await fetch(
      "https://mern-interview-test-77pc.onrender.com/api/drawings",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      console.error("ERROR");
    }
    if (res.ok) {
      console.log("New image added");
      alert("Saved successfully");
      clearBoard();
    }
  };

  const clearBoard = () => {
    setLines([]);
  };

  if (tool === "rectangle") {
    layer = <DrawRect stageRef={stageRef} />;
  } else if (tool === "circle") {
    layer = <DrawCircle stageRef={stageRef} />;
  } else {
    layer = (
      <Stage
        width={800}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={line.tool === "eraser" ? 30 : 5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    );
  }
  return (
    <div className="board">
      {layer}
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="eraser">Eraser</option>
      </select>
      <button onClick={() => handleSubmit(title)}>save</button>
      <button onClick={() => clearBoard()}>clear</button>
      <label>Title</label>
      <input
        placeholder="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        required
      ></input>
    </div>
  );
};

export default Board;
