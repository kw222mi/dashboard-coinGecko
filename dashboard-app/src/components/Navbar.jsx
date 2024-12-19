import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Översikt</Link>
      <Link to="/details">Detaljer</Link>
      <Link to="/settings">Inställningar</Link>
    </nav>
  );
};
export default Navbar;
