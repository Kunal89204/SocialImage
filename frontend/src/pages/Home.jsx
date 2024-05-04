import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import UserContext from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

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
