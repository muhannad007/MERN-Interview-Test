import { Link } from "react-router-dom";

const Drawing = ({ drawing }) => {
  return (
    <Link
      to="/drawing-details"
      state={{ id: drawing._id }}
      className="drawing-details"
    >
      <div>
        <img src={drawing.shape} alt={drawing.title} />
        <h2>{drawing.title}</h2>
      </div>
    </Link>
  );
};

export default Drawing;
