import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Drawing from "../components/Drawing";
// import Board from "../components/Board";

const Drawings = () => {
  const [drawings, setDrawings] = useState(null);
  useEffect(() => {
    const fetshDrawings = async () => {
      const res = await fetch(
        "https://mern-interview-test-77pc.onrender.com/api/drawings/"
      );
      const json = await res.json();

      if (res.ok) {
        setDrawings(json);
      }
    };

    fetshDrawings();
  }, []);
  return (
    <div className="home">
      <div className="drawings">
        {drawings &&
          drawings.map((drawing) => (
            <Drawing key={drawing._id} drawing={drawing} />
          ))}
      </div>
    </div>
  );
};

export default Drawings;
