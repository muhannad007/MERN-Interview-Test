import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WhiteBoard</h1>
        </Link>
        <Link to="/drawings">
          <h3>Drawings</h3>
        </Link>
        {/* <Link>
          <h3>Drawings</h3>
        </Link> */}
      </div>
    </header>
  );
};

export default Navbar;
