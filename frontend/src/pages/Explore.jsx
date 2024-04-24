import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const [followers, setFollowers] = useState([]);
  // const [isFollowed, setIsFollowed] = useState("Follow")

  const followUser = (e, username) => {
    const button = e.target; // Accessing the button element
    axios
      .post(`http://localhost:3000/followapi/follow/${userId}`, { username })
      .then((response) => {
        const buttonValue = button.textContent; // Accessing the text content of the button
        if (buttonValue === "Follow") {
          button.textContent = "Following"; // Change button text to "Following"
          button.classList.remove("bg-blue-500"); // Remove blue background
          button.classList.add("bg-gray-500"); // Add gray background
        } else {
          button.textContent = "Follow"; // Change button text to "Follow"
          button.classList.remove("bg-gray-500"); // Remove gray background
          button.classList.add("bg-blue-500"); // Add blue background
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/followapi/followers/${userId}`)
      .then((response) => setFollowers(response.data));
  }, [userId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        // Filter out the current user's profile
        const filteredUsers = response.data.filter(
          (user) => user._id !== userId
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen h-max lg:flex gap-2 justify-around flex-wrap p-2">
        {users.map((user, index) => (
          <div
            className="bg-gray-900 lg:w-[19%] mb-2 h-fit rounded-lg pt-6 pb-2"
            key={index}
          >
            <div className="overflow-hidden flex justify-center">
              <img
                src={
                  user.profileImg
                    ? `http://localhost:3000/uploads/${user.profileImg}`
                    : "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                }
                alt=""
                className="w-1/2 aspect-square rounded-full"
              />
            </div>
            <div className="text-white text-center">
              <p className="text-lg py-1">
                {user.fullName ? user.fullName : user.username}
              </p>
              <p className="text-sm text-gray-500">Suggested For you</p>
            </div>
            <div className="text-white text-center flex justify-center gap-4 pt-10 pb-4">
              <Link to={`/profile/${user.username}`}>
                <button className="rounded py-1 bg-blue-500 px-8">Visit</button>
              </Link>
              <Button
                followUser={followUser}
                username={user.username}
                followstatus={
                  followers.includes(user.username) ? "Following" : "Follow"
                }
                background={
                  followers.includes(user.username)
                    ? "bg-gray-500"
                    : "bg-blue-500"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Button = ({ followUser, username, followstatus, background }) => {
  return (
    <button
      onClick={(e) => followUser(e, username)}
      className={`rounded py-1 ${background} px-8`}
    >
      {followstatus}
    </button>
  );
};

export default Explore;
