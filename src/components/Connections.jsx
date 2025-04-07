import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">NO connections found</h1>;
  return (
    <div className="text-center my-10 px-4 sm:px-6 pb-24"> {/* Added pb-24 to prevent footer collision */}
  <h1 className="font-bold text-3xl mb-6">Connections</h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, age, gender, photoUrl, about } = connection;

    return (
      <div
        key={_id}
        className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-4 mb-6 p-4 rounded-xl bg-base-300 w-full max-w-2xl mx-auto shadow-md"
      >
        {/* Avatar */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            alt="photo"
            className="w-full h-full rounded-full object-cover"
            src={photoUrl}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p className="text-sm text-white mt-1">{age + ", " + gender}</p>
          )}
          <p className="text-white text-sm sm:text-base mt-1 break-words">{about}</p>
        </div>

        {/* Chat Button */}
        <div className="w-full md:w-auto mt-3 md:mt-0 text-center">
          <Link to={"/chat/" + _id}>
            <button className="btn btn-primary btn-sm sm:btn-md w-full md:w-auto">
              Chat
            </button>
          </Link>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default Connections;
