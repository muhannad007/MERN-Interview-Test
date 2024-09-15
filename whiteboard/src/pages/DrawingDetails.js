import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DrawingDetails = () => {
  const location = useLocation();
  const { id } = location.state;
  const [singleDrawing, setSingleDrawing] = useState("");

  const handleClick = async () => {
    const res = await fetch(
      "https://mern-interview-test-77pc.onrender.com/api/drawings/" + id,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();
    console.log(json);

    if (res.ok) {
      window.location = "/drawings";
    }
  };

  useEffect(() => {
    const fetshDrawing = async () => {
      try {
        const res = await fetch(
          "https://mern-interview-test-77pc.onrender.com/api/drawings/" + id
        );
        const json = await res.json();
        // console.log(json);

        if (res.ok) {
          setSingleDrawing(json);
        } else {
          console.log(res.json());
        }
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetshDrawing();
  });
  return (
    <div className="single-drawing">
      <img src={singleDrawing.shape} alt={singleDrawing.title} />
      <h2>{singleDrawing.title}</h2>
      <button className="delete-button" onClick={() => handleClick()}>
        Delete
      </button>
    </div>
  );
};

export default DrawingDetails;
