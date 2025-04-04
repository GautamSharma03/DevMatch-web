import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  
  const [gender, setGender] = useState(user.gender|| "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast,setShowToast]=useState(false)

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true)
     setTimeout(() => {
        setShowToast(false)
      }, 2000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
  <div className="flex flex-col md:flex-row items-center justify-center my-10 px-4 gap-6">
    {/* Profile Edit Card */}
    <div className="w-full max-w-xs md:max-w-lg">
      <div className="card bg-base-300 shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title text-center">Edit Profile</h2>
          <div>
            <label className="form-control w-full my-2">
              <div className="label">
                <span className="label-text mt-4 mb-2">First Name:</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full my-2">
              <div className="label mt-3 mb-2">
                <span className="label-text">Last Name:</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full my-2">
              <div className="label mt-3 mb-2">
                <span className="label-text">Photo URL:</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full my-2">
              <div className="label mt-3 mb-2">
                <span className="label-text">Age:</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full my-2">
              <div className="label mt-3 mb-2">
                <span className="label-text">Gender:</span>
              </div>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="form-control w-full my-2">
              <div className="label mt-3 mb-2">
                <span className="label-text">About:</span>
              </div>
              <input
                type="text"
                value={about}
                className="input input-bordered w-full"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <p className="text-red-500 text-sm text-center">{error}</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary w-full md:w-auto" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* User Card - Stacks on Mobile, Side-by-Side on Large Screens */}
    <div className="w-full max-w-xs md:max-w-md md:ml-10">
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  </div>

  {/* Toast Notification */}
  {showToast && (
    <div className="toast toast-top toast-center fixed">
      <div className="alert alert-success">
        <span>Profile Updated Successfully</span>
      </div>
    </div>
  )}
</>

  );
};

export default EditProfile;
