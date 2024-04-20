import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import NewPost from "../components/NewPost";


const Post = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <NewPost />
    </>
  );
};

export default Post;
