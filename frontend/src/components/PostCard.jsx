import React, { useEffect, useState } from 'react';
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import { CiBookmark, CiMenuKebab, CiBookmarkCheck } from "react-icons/ci";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from '../context/store';
import axios from 'axios';
// import DeletePostButton from './props/DeletePostButton';


const PostCard = ({ fullname, username, imgurl, title, body, postId, profileImg, commentsCount }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const [likedUsers, setLikedUsers] = useState([])
  const [totalLikes, setTotalLikes] = useState(0)
  const [savedPosts, setSavedPosts] = useState([])

  const fetchLikesForAPost = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getLikesForAPost/${postId}`)
      .then((respo) => {
        setLikedUsers(respo.data.likes)
        setTotalLikes(respo.data.totalLikes)
      })
      .catch((err) => console.log(err))
  }

  const getSavedpost = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getsavedpost/${user?.user?._id}`)
      .then((respo) => setSavedPosts(respo.data.savedPosts.map((post) => post)))
      .catch((err) => {
        console.log(err, user.user._id)
      })
  }

  const handleSave = async () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/savepost`, { userId: user.user._id, postId })
      .then((respo) => getSavedpost())
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLike = async () => {
    try {
      const userId = user.user._id; // Ensure this is available in the context where handleLike is called
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/toggleLike/${userId}`, {
        postId
      });
      fetchLikesForAPost()
    } catch (error) {
      console.error(error);
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    getSavedpost()
  }, [user])

  useEffect(() => {
    fetchLikesForAPost()
  }, [postId])

  useEffect(() => {
    fetchLikesForAPost()
  }, [postId])



  return (
    <div className='hover:bg-gray-950 w-full border border-gray-700 rounded-xl shadow-md p-3'>
      <div className='text-xl font-semibold flex justify-between items-center'>
        <div className='flex items-center gap-5'>
          <div className='w-10'>
            <img src={profileImg} className='rounded-full' alt="Profile" />
          </div>
          <div>
            <div className='text-sm'>
              <Link to={`/${username}`}>{fullname}</Link>
            </div>
            <div className='text-xs text-gray-500'>@{username}</div>
          </div>
        </div>
        <div className='relative text-sm'>
          <button
            onClick={toggleDropdown}
            className="text-white rounded-lg text-xl text-center inline-flex items-center"
          >
            <CiMenuKebab />
          </button>
          {dropdownOpen && (
            <div className="absolute border border-gray-700 right-0 z-10 bg-black divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-300 flex flex-col">
                <Link className='py-2 text-center hover:bg-gray-900' to={`/post/${postId}`}>Go to Post</Link>
                <Link className='py-2 text-center hover:bg-gray-900' to={`/${username}`}>Visit Profile</Link>
                {/* <DeletePostButton id={postId} imgurl={imgurl} /> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Link to={`/post/${postId}`}>
        <div className='p-1 py-2'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <p className='text-base text-gray-400 line-clamp-[3] max-w-[500px]'>{body}</p>
        </div>
        {imgurl && (
          <div className='w-full rounded-xl border border-gray-600 overflow-hidden'>
            <img src={imgurl} alt="Post" className='w-auto m-auto max-h-[435px]' />
          </div>
        )}
      </Link>
      <div className='flex justify-between px-1 pt-4 items-center'>
        <div className='flex space-x-4 items-center'>
          <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center'>
            {likedUsers.includes(user.user._id) ? <BiSolidUpvote onClick={handleLike} /> : <BiUpvote onClick={handleLike} />}<span className='text-sm'> {totalLikes && totalLikes}</span>
          </div>
          <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center gap-1'>
            <FaRegCommentAlt /><span className='text-sm'> {commentsCount}</span>
          </div>
          <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center gap-1'>
            <FaShare /><span className='text-sm'>Share</span>
          </div>
        </div>
        <div className=' text-xl rounded-full px-4 py-1 text-gray-400 flex items-center'>
          {savedPosts && savedPosts.includes(postId) ? <FaBookmark onClick={handleSave} /> : <FaRegBookmark onClick={handleSave} />}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
