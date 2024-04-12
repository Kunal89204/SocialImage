import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [profile, setProfile] = useState(
    "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
  );

  useEffect(() => {
    axios.get(`http://localhost:3000/user/userinfoid/${userId}`).then((response) => {
      setProfile(`http://localhost:3000/uploads/${response.data.profileImg}`);
      setUserData(response.data)
    });
  }, [userId]);
  

  const modalDisplay = () => {
    setModal(!modal);
  };

  return (
    <div className="flex justify-between p-2 bg-gray-100">
      <nav className="flex gap-10">
        <Link to={'/'}>
          <li className="py-2 px-4 rounded-lg hover:bg-gray-300 border border-gray-100 hover:border-gray-300">
            Home
          </li>
        </Link>
        <Link>
          <li className="py-2 px-4 rounded-lg hover:bg-gray-300 border border-gray-100 hover:border-gray-300">
            Posts
          </li>
        </Link>
        <Link to={'/explore'}>
          <li className="py-2 px-4 rounded-lg hover:bg-gray-300 border border-gray-100 hover:border-gray-300">
            Explore
          </li>
        </Link>
        <Link to={`/chats/${userData.username}`}>
          <li className="py-2 px-4 rounded-lg hover:bg-gray-300 border border-gray-100 hover:border-gray-300">
            Chats
          </li>
        </Link>
       
      </nav>
      <div className="cursor-pointer" onClick={modalDisplay}>
        <img src={profile} alt="" className="w-10 rounded-full h-10" />
        {modal && <Dropdown />}
      </div>
    </div>
  );
};

const Dropdown = () => {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userId")
    navigate('/')
  }

  
  useEffect(() => {
    axios.get(`http://localhost:3000/user/userinfoid/${userId}`).then((response) => {
      setUserData(response.data.username);
    });
  }, [userId]);

  return (
    <>
      <div className="rounded shadow-2xl absolute right-10 top-10 bg-white z-10">
        <div className="py-2 px-4">
          <Link to={`/profile/${userData}`}>My Profile</Link>
        </div>

        <div className="py-2 px-4" onClick={logOut}>Logout</div>
      </div>
    </>
  );
};

export default Navbar;
