import React, { useState } from 'react';
import { useAuthStore } from '../context/store';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';




const CreatePost = () => {
  const { user } = useAuthStore()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  // const [toast, setToast] = useState(false)
  const toast = useToast()


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('isPublic', isPublic);
    if (file) {
      data.append('post', file);
    }

    const postPromise = axios.post(`${import.meta.env.VITE_BACKEND_URL}/addpost/${user.user._id}`, data)

    toast.promise(postPromise, {
      loading: { title: 'Uploading', description: 'Please wait while the post is uploading' },
      success: { title: 'Post Uploaded', description: 'Post has been uploaded successfully.' },
      error: { title: 'Error', description: 'There was an error uploading the post.' },
    })

    postPromise
      .then((respo) => {
        console.log(respo.data);

      })
      .catch((error) => {
        console.log(error);
      });


  };



  const toggleIsPublic = () => {
    setIsPublic((prev) => !prev);
  };



  return (
    <div className="min-h-screen text-white flex items-center">






      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-[#0e0e0e] text-white rounded-md border-gray-700 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {file ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded file"
                      className="mx-auto h-48 w-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-2 right-2 bg-black text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8v20m-8-10h20M28 8L12 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-white py-1 px-4 hover:text-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full bg-[#0e0e0e] text-white rounded-md border-gray-700 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="isPublic" className="block text-sm font-medium text-gray-400 mr-4">
              Public
            </label>
            <button
              type="button"
              onClick={toggleIsPublic}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${isPublic ? 'bg-white' : 'bg-gray-700'
                }`}
            >
              <span
                className={`${isPublic ? 'translate-x-6 bg-gray-800' : 'translate-x-1 bg-white'
                  } inline-block w-4 h-4 border  transform  rounded-full transition-transform duration-200`}
              />
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#161616] hover:bg-[#1b1b1b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
