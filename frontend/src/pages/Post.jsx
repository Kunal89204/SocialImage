import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import PostCard from '../components/PostCard'
import axios from 'axios'
import { useAuthStore } from '../context/store'
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { fetchData } from '../hooks/useFetchData';
// import {} from '@'
import {
  Button, SkeletonCircle, SkeletonText, Flex, Stack, Skeleton, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';




const Post = () => {
  const { postId } = useParams()
  const { user } = useAuthStore()
  const [postData, setPostData] = useState({})
  const [likedUsers, setLikedUsers] = useState([])
  const [totalLikes, setTotalLikes] = useState(0)
  const [savedPosts, setSavedPosts] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [commentValue, setCommentVlaue] = useState('')
  const [comments, setComments] = useState([])
  const [isPostLoading, setIsPostLoading] = useState(true)
  const [isCommentLoading, setIsCommentLoading] = useState(true)

  const fetchPostData = async () => {
    const response = await fetchData.getPostData(user?.accessToken, postId)
    setPostData(response)
    setIsPostLoading(false)
    fetchComments()

  }

  const fetchLikesForAPost = async () => {
    const response = await fetchData.getLikesForAPost(user?.accessToken, postId)
    setLikedUsers(response.likes)
    setTotalLikes(response.totalLikes)
  }

  const fetchComments = async () => {
    try {
      await fetchData.getCommentsForAPost(user?.accessToken, postId)
        .then((respo) => {
          setComments(respo.data)
          console.log(respo.data)
          setIsCommentLoading(false)
        })

    } catch (error) {
      console.log(error)
    }
  }

  const getSavedPost = async () => {
    const response = await fetchData.getSavedPost(user?.accessToken, user?.user?._id)
    setSavedPosts(response.savedPosts.map((post) => post))
  }

  const handleSave = async () => {
    try {
      const response = await fetchData.handleSave(user?.accessToken, user?.user?._id, postId)
      getSavedPost()
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    try {
      const response = await fetchData.handleLike(user?.accessToken, user?.user?._id, postId)
      fetchLikesForAPost()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = async () => {
    try {
      if (commentValue.trim() !== "") {
        await fetchData.addComment(user?.accessToken, postId, user?.user?._id, commentValue)
          .then((respo) => {
            setCommentVlaue('')
            fetchComments()
          })
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const handleCommentDelete = async (commentId) => {
    try {
      await fetchData.deleteComment(user?.accessToken, commentId)
        .then((respo) => {
          fetchComments()
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPostData()
    fetchLikesForAPost()

  }, [postId, user?.accessToken])

  useEffect(() => {
    getSavedPost()
  }, [user?.accessToken, user?.user?._id])



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='flex'>
      <div className='w-2/3'>


        {isPostLoading ? <Stack height={'500px'} width={'600px'} padding={'15px'}>
          <Flex alignItems={'center'} gap={'10px'}>
            <Skeleton height={'40px'} width={'40px'} borderRadius={'full'} />
            <Stack>
              <Skeleton height={'10px'} width={'120px'} />
              <Skeleton height={'8px'} width={'80px'} />
            </Stack>
          </Flex>
          <Skeleton height={'15px'} width={'350px'} />
          <Skeleton height={'10px'} width={'250px'} />
          <Skeleton height={'350px'} width={'full'} rounded={'10px'} />

        </Stack> : <div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5'>
              <div><Link to={'/'}><FaArrowLeft /></Link></div>
              <div className='w-10 h-10 rounded-full overflow-hidden'><img src={postData?.userId?.profileImg} alt="" /></div>
              <div>
                <div className='text-sm flex gap-1'>
                  <Link to={`/${postData?.userId?.username}`}>{postData?.userId?.fullName}</Link>
                  <div className='text-gray-600 text-sm flex items-center gap-1'><span className='h-1 w-1 bg-gray-600 rounded-full aspect-square'></span>6hr ago</div>
                </div>
                <div className='text-xs text-gray-500'>@{postData?.userId?.username}</div>
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
                    <Link className='py-2 text-center hover:bg-gray-900' to={`/${postData?.userId?.username}`}>Visit Profile</Link>
                    {/* <DeletePostButton id={postId} imgurl={imgurl} /> */}
                  </ul>
                </div>
              )}
            </div>

          </div>
          <h1 className='text-2xl font-semibold'>{postData.title}</h1>
          <p className='text-base text-gray-400'>{postData.description}</p>
          <div className='w-full rounded-xl border my-2 border-gray-950 overflow-hidden'>
            <img src={postData.imgUrl} alt="Post" className='w-auto m-auto max-h-[435px]' />
          </div>
          <div className='flex justify-between px-1 pt-4 items-center'>
            <div className='flex space-x-4 items-center'>
              <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center'>
                {likedUsers.includes(user?.user?._id) ? <BiSolidUpvote onClick={handleLike} /> : <BiUpvote onClick={handleLike} />}<span className='text-sm'> {totalLikes && totalLikes}</span>
              </div>
              <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center gap-1'>
                <FaRegCommentAlt /><span className='text-sm'> {comments?.length}</span>
              </div>
              <div className='text-xl bg-gray-900 rounded-full px-4 py-1 text-gray-400 flex items-center gap-1'>
                <FaShare /><span className='text-sm'>Share</span>
              </div>
            </div>
            <div className=' text-xl rounded-full px-4 py-1 text-gray-400 flex items-center'>
              {savedPosts && savedPosts.includes(postId) ? <FaBookmark onClick={handleSave} /> : <FaRegBookmark onClick={handleSave} />}
            </div>
          </div>
        </div>}

        {/*Comments cpomponent  */}
        <div>
          <div className='py-6 flex gap-4'>
            <img src={user?.user?.profileImg} alt="" className='w-10 h-10 rounded-full' />
            <input type="text" placeholder='Add Comment' className='bg-transparent rounded-full w-full focus:border-gray-700 focus:outline-none border-gray-800' value={commentValue} onChange={(e) => setCommentVlaue(e.target.value)} />
            <Button onClick={handleAddComment} borderRadius={'full'} height={'40px'} fontWeight={'400'}>Comment</Button></div>
        </div>
        {/* comments list */}
        <div className='flex flex-col '>


          {isCommentLoading ? <> <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' /></> : comments.map((c, i) => (
              <div key={i} className='flex gap-2 pt-3 '>
                <img src={c.user.profileImg} alt="" className='w-10 h-10 rounded-full' />
                <div className='w-full overflow-hidden'>
                  <div className='flex justify-between '>
                    <div className='flex  gap-2'>{c?.user?.username}  <div className='text-gray-600 text-sm flex items-center gap-1'><span className='h-1 w-1 bg-gray-600 rounded-full aspect-square'></span>6hr ago</div></div>
                    <Menu>
                      <MenuButton p={1}>
                        <div className='flex flex-col gap-[1px] '>
                          <span className="w-1 h-1 rounded-full bg-gray-600"></span><span className="w-1 h-1 rounded-full bg-gray-600"></span><span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        </div>
                      </MenuButton>
                      <MenuList bg={'black'} borderColor={'gray.700'} p={0}>
                        <MenuItem bg={'black'} rounded={'lg'}>Report</MenuItem>
                        {c?.user?._id == user?.user?._id && <MenuItem bg={'black'} rounded={'lg'}   onClick={() => handleCommentDelete(c?._id)}>Delete</MenuItem>}
                      </MenuList>
                    </Menu>
                  </div>
                  <div className='border-b border-gray-700 pb-3 max-w-full'>{c?.content}</div>
                </div>

              </div>
            ))}

        </div>
      </div>

      {/* Profile data */}
      <div></div>
    </div>
  )
}

export default Post
