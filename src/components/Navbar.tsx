import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white w-full">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">SpaceTraders!</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              New Game
            </Link>
          </li>
          <li>
            <Link to="/myagent" className="hover:text-gray-300">
              My Agent
            </Link>
          </li>
          <li>
            <Link to="/viewlocation" className="hover:text-gray-300">
              View Location
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
