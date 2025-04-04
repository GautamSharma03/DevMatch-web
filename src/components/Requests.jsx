import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";

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

  console.log(requests);
  return (
    <>
      <div className="  text-center my-10">
        <h1 className=" text-bold text-3xl">Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 h-1/6 mx-auto"
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-7  w-1/2">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div className=" flex-1/4">
                <button className="btn btn-active btn-primary mx-2" onClick={()=>reviewRequest("rejected", request._id )}>
                  Reject
                </button>
                <button className="btn btn-active btn-accent mx-2" onClick={()=>reviewRequest("accepted", request._id )}>
                  Accept
                </button>
              </div>
              {/* <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
