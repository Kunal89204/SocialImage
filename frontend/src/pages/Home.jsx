import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import NewPost from "../components/NewPost";



const Home = () => {
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
    {/* <NewPost /> */}
    </>
  );
};

export default Home;
