import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addUser } from "../utils/userSlice";

const DEFAULT_PHOTO_URL =
  "https://cdn-icons-png.flaticon.com/512/552/552721.png";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    const updatedPhotoUrl =
      photoUrl.trim() === "" ? DEFAULT_PHOTO_URL : photoUrl;

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl: updatedPhotoUrl,
          age: String(age),
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center my-10 px-4 gap-8 pb-28"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Profile Edit Form */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md md:max-w-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="card bg-base-300 shadow-xl p-5 sm:p-6">
            <div className="card-body text-base sm:text-lg">
              <h2 className="card-title text-center text-xl sm:text-2xl mb-4">
                Edit Profile
              </h2>

              {/* Form fields */}
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">First Name:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">Last Name:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">Photo URL:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">Age:</span>
                <input
                  type="number"
                  min={1}
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">Gender:</span>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="form-control w-full mb-3">
                <span className="label-text mb-1">About:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <p className="text-red-500 text-sm text-center mt-2">{error}</p>

              <div className="card-actions justify-center mt-5">
                <button
                  className="btn btn-primary w-full md:w-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md md:max-w-md text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Your Card Preview
          </h3>
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl: photoUrl.trim() === "" ? DEFAULT_PHOTO_URL : photoUrl,
              age,
              gender,
              about,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          className="toast fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="alert alert-success">
            <span className="text-base sm:text-lg">
              Profile Updated Successfully
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EditProfile;
