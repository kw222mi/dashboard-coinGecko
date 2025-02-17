
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-200 text-gray-600 p-3">
      <Link className="font-main p-3 font-bold text-lg" to="/">
        Overview
      </Link>
      <Link className="font-main p-3 font-bold text-lg" to="/details">
        Details
      </Link>
      <Link className="font-main p-3 font-bold text-lg" to="/settings">
        Settings
      </Link>
    </nav>
  );
};
export default Navbar;
