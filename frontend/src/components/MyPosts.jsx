import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyPosts = () => {
  const [myposts, setMyPosts] = useState([]);
  const [postOwner, setPostOwner] = useState(false); // Initialize postOwner state as false
  const userid = localStorage.getItem("userId");
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/posts/${username}`)
      .then((response) => {
        setMyPosts(response.data);
        // Check if any post belongs to the logged-in user
        const isPostOwner = response.data.some(post => post.userId === userid);
        setPostOwner(isPostOwner);
      });
  }, [username, userid]);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/post/delete/${postId}`);
      // Remove the deleted post from myposts state
      setMyPosts(myposts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex p-4 gap-2">
      {myposts.map((post, index) => (
        <div key={index} className="p-2 bg-gray-300 h-fit w-1/5">
          <div className="">
            <img src={`http://localhost:3000/uploads/${post.imgUrl}`} alt="" />
          </div>
          <div>
            {post.description} {postOwner && (
              <div>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
