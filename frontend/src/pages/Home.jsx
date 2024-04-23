import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";





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
    <Posts />
    </>
  );
};

export default Home;
