import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { motion } from "framer-motion";
const Requests = () => {
  const requests = useSelector((store) => store.requests || []);
  
  
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id, {} , {withCredentials:true}
      );
      dispatch(removeRequest( _id))

    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      

      dispatch(addRequest(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) 
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  
  return (
    <>
    <div className="text-center my-10 px-4 pb-24"> {/* Added pb-24 for footer space */}
      <h1 className="font-bold text-3xl sm:text-4xl mb-6">Requests</h1>
  
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;
  
        return (
          <motion.div
          key={_id}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 m-4 p-4 rounded-lg bg-base-300 w-full sm:w-4/5 lg:w-2/3 mx-auto shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              alt="photo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              src={photoUrl}
            />
          </div>
        
          {/* User Info */}
          <div className="text-center sm:text-left sm:mx-6 w-full sm:w-1/2">
            <h2 className="font-bold text-xl sm:text-2xl">
              {firstName + " " + lastName}
            </h2>
            {age && gender && (
              <p className="text-base sm:text-lg">{age + ", " + gender}</p>
            )}
            <p className="text-sm sm:text-base mt-1">{about}</p>
          </div>
        
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
            <button
              className="btn btn-active btn-primary"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-active btn-accent"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
          </div>
        </motion.div>
        );
      })}
    </div>
  </>
  

  );
};

export default Requests;
