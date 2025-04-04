import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
if(!feed) return null
if (feed.length === 0) {
  return <h1 className="flex justify-center my-10 text-2xl">No new users found!</h1>; // CHANGED: Better UI alignment
}
 
  return feed && (
    
    <div className=" flex justify-center my-20">
      {feed.length > 0 && <UserCard user={feed[0]} />}
    </div>
    
  );
};

export default Feed;
