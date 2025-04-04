import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">NO connections found</h1>;
  return (
    <div className="  text-center my-10">
      <h1 className=" text-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 m-4 p-4 rounded-lg bg-base-300 w-full max-w-lg mx-auto shadow-md"
          >
            <div className="w-20 h-20">
              <img
                alt="photo"
                className="w-full h-full rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-white">{age + ", " + gender}</p>
              )}
              <p className="text-white">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
