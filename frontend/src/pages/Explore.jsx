import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId"); // Get userId from localStorage


  const followUser = (userToFollowId) => {
    axios.post("http://localhost:3000/followapi/follow", {
        userId,
        userToFollowId
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "User followed successfully.") {
          // Handle success case
          console.log("User followed successfully.");
        } else if (response.data.message === "You are already following this user.") {
          // Handle case where user is already following the target user
          console.log("You are already following this user.");
        } else {
          // Handle other response messages
          console.log("Unexpected response:", response.data.message);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        // Filter out the current user's profile
        const filteredUsers = response.data.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]); // Added userId as a dependency

  return (
    <>
      <Navbar />
      <div className="bg-black h-screen flex gap-5 flex-wrap p-2">
        {users.map((user, index) => (
          <div className="bg-gray-900 w-1/5 h-fit rounded-lg pt-6 pb-2" key={index}>
            <div className="overflow-hidden flex justify-center">
              <img
                src={user.profileImg ? `http://localhost:3000/uploads/${user.profileImg}` : 'https://cdn-icons-png.flaticon.com/512/10337/10337609.png'}
                alt=""
                className="w-1/2 aspect-square rounded-full"
              />
            </div>
            <div className="text-white text-center">
              <p className="text-lg py-1">{user.fullName ? user.fullName : user.username}</p>
              <p className="text-sm text-gray-500">Suggested For you</p>
            </div>
            <div className="text-white text-center flex justify-center gap-4 pt-10 pb-4">
              <Link to={`/profile/${user.username}`}>
                <button className="rounded py-1 bg-blue-500 px-8">Visit</button>
              </Link>
              <button onClick={() => followUser(user._id)} className="rounded py-1 bg-blue-500 px-8">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Explore;
