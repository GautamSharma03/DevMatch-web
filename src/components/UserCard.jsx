import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      setIsLeaving(true); // Start animation

      setTimeout(async () => {
        await axios.post(
          `${BASE_URL}/request/send/${status}/${userId}`,
          {},
          { withCredentials: true }
        );

        dispatch(removeUserFromFeed(userId));
        setIsLeaving(false); // Reset for next render
      }, 300); // Match animation duration
    } catch (error) {
      console.error("Error sending request:", error);
      setIsLeaving(false);
    }
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          key={_id}
          className="w-full flex justify-center px-3 mt-6 sm:mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 150 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card bg-base-200 w-full max-w-sm sm:max-w-md shadow-md rounded-xl">
            <figure>
              <img
                className="mt-3 rounded-2xl w-full object-cover"
                src={photoUrl}
                alt="Profile"
              />
            </figure>
            <div className="card-body text-sm sm:text-base">
              <h2 className="card-title text-lg sm:text-xl">
                {firstName + " " + lastName}
              </h2>

              {age && gender && (
                <p className="text-xs sm:text-sm text-gray-400">
                  {age + ", " + gender}
                </p>
              )}

              <p className="mt-1 text-xs sm:text-sm">{about}</p>

              <div className="card-actions justify-end mt-4 space-x-2">
                <button
                  className="btn btn-primary btn-sm sm:btn-md"
                  onClick={() => handleSendRequest("ignored", _id)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary btn-sm sm:btn-md"
                  onClick={() => handleSendRequest("interested", _id)}
                >
                  Interested
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserCard;
