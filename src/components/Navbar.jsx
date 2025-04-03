import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Navbar =()=>{
  const user = useSelector((store)=>store.user)
    return (
       <>
       <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-2xl mx-2">DevMatch</Link>
  </div>
  <div className="flex gap-2">
    
   {user && ( 
    
    <div className="dropdown dropdown-end flex ">
      <p className="mx-4 text-xl mt-1.5">Welcome  {user.firstName}</p>
      <div tabIndex={0} role="button" className=" btn btn-ghost btn-circle avatar mx-5">
        <div className="w-10 rounded-full">
          <img
            alt="add url"
            src={user.photoUrl} />
        </div>
      </div>
      <ul 
        tabIndex={0}
        className=" menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-14 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
       </>
    )
}

export default Navbar