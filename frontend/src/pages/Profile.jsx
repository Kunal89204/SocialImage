import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MyPosts from "../components/MyPosts";


const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  let { username} = useParams();


  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:3000/user/userinfo/${username}`).then((response) => {
      setUserData(response.data);
      if (response.data._id === userId) {
        setEditProfile(true);
      }
    });
  }, [username, userId]);
  
  return (
    <>
      <Navbar />
      <div className=" relative">
        <div className="bg-gray-50 h-80 m-2 rounded-lg overflow-hidden">
          <img
            src={userData.bannerImg ? `http://localhost:3000/uploads/${userData.bannerImg}` : 'https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/391ffeaf6a4f87f52f34d9d5874ee869?t=1705059868&webp_fallback=png'}
            alt=""
            className="h-full w-full"
          />
        </div>
        <div className="w-40 h-40 border-[5px] border-gray-300 rounded-full absolute bottom-0 translate-y-1/2 left-10 overflow-hidden">
          <img
            src={userData.profileImg? `http://localhost:3000/uploads/${userData.profileImg}` : 'https://cdn-icons-png.flaticon.com/512/10337/10337609.png'}
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="">
          <div className="font-semibold text-3xl">{userData.fullName ? userData.fullName : userData.username}</div>
          <div className="text-sm">{userData.location}</div>
          <div className="flex border gap-2 ">
            {userData.socialMedia && userData.socialMedia.facebook && (
              <Link to={`https://${userData.socialMedia.facebook}`}>
                Facebook
              </Link>
            )}
            {userData.socialMedia && userData.socialMedia.instagram && (
              <Link to={`https://${userData.socialMedia.instagram}`}>
                Instagram
              </Link>
            )}
            {userData.socialMedia && userData.socialMedia.linkedIn && (
              <Link to={`https://${userData.socialMedia.linkedIn}`}>
                LinkedIn
              </Link>
            )}
            {userData.socialMedia && userData.socialMedia.twitter && (
              <Link to={`https://${userData.socialMedia.twitter}`}>
                Twitter
              </Link>
            )}
          </div>
        </div>
        {editProfile && (
          <div className="">
            <Link to={"/editprofile"}>
              <button className="py-2 px-4 rounded-lg cursor-pointer ml-20 bg-orange-400 text-white">
                Edit Profile
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="border mt-10 bg-gray-200">
      <MyPosts />
      </div>
    </>
  );
};

export default Profile;
