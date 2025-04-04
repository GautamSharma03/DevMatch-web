import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login")
    } catch (error) {
      
    }
  };
  return (
    <>
  <div className="navbar bg-base-300 shadow-sm sticky top-0 z-10 px-4">
    <div className="flex justify-between items-center w-full">
      
      {/* Logo */}
      <Link to="/" className="btn btn-ghost text-xl sm:text-2xl">
        DevMatch
      </Link>

      {/* User Dropdown */}
      {user && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center btn btn-ghost"
          >
            {/* Show name on desktop, menu icon on mobile */}
            <p className="hidden sm:block text-lg mr-2">Welcome, {user.firstName}</p>
            <span className="sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </span>
            <div className="avatar ml-2">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={user.photoUrl} />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      )}
    </div>
  </div>
</>

  );
};

export default Navbar;
