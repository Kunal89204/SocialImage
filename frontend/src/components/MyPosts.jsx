import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPosts = () => {
    const [myposts, setMyPosts] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        axios.get(`http://localhost:3000/post/posts/${userId}`)
        .then((response) => {
            setMyPosts(response.data)
    })

    console.log(myposts) 
    }, [userId])
  return (
    <div className="flex p-4 gap-2">
        {myposts && myposts.map((post) => {
            return (
                <div className="p-2 bg-gray-300 ">
        <div>
          <img
            src={`http://localhost:3000/uploads/${post.imgUrl}`}
            alt=""
          />
        </div>
        
        <div> {post.description} </div>
      </div>
            )
        })}
      
    </div>
  );
};

export default MyPosts;
