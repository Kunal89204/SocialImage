import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const NewPost = () => {
  const navigate = useNavigate()
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State to hold the image preview URL
  const userId = localStorage.getItem("userId");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Set the image preview URL
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("post", file);
      formData.append("description", description);

      // Make a POST request to the server
      const response = await axios.post(
        `http://localhost:3000/post/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate('/')
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="text-center">
          <label htmlFor="" className="text-3xl block p-4">
            New Post
          </label>
          <input
            type="text"
            className="border-2 w-full p-4 rounded-full mb-4 h-max"
            placeholder="Write something"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Choose a file
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {preview && (
          <div className="flex justify-center p-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="flex justify-center p-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded-xl shadow-lg transition duration-300 ease-in-out"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
