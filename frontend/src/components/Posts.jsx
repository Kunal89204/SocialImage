import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex gap-10 justify-around p-2">
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index} className="border w-[24%] shadow-lg rounded-lg">
              <div className="flex items-center gap-10 p-1">
                <div className="w-10 rounded-full overflow-hidden aspect-square">
                  <Link to={`/profile/${post.userId.username}`}>
                    <img
                      src={`http://localhost:3000/uploads/${post.userId.profileImg}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div>
                  <Link to={`/profile/${post.userId.username}`}>
                    {post.userId.fullName}
                  </Link>
                </div>
              </div>
              <div>
                <img
                  src={`http://localhost:3000/uploads/${post.imgUrl}`}
                  alt="post"
                />
              </div>
              <div>{post.description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
