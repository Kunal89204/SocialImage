import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useAuthStore } from '../context/store';
import { Skeleton, Stack, Flex } from '@chakra-ui/react';
import { fetchData } from '../hooks/useFetchData';



const Home = () => {
  const { user } = useAuthStore()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const response = await fetchData.getallposts(user?.accessToken)
      setPosts(response)
      setLoading(false)
    } catch (error) {
      console.log(error, "i am error")
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user.user._id, user?.accessToken])





  return (
    <div className='flex p-4'>
      <div className='flex  w-[64%] flex-col  justify-center gap-14  px-4 py-2'>
        {loading ? <Stack height={'500px'} width={'550px'} borderWidth={'1px'} borderColor={'gray.600'} borderRadius={'10px'} padding={'15px'}>
          <Flex alignItems={'center'} gap={'10px'}>
            <Skeleton height={'50px'} width={'50px'} borderRadius={'full'} />
            <Stack>
              <Skeleton height={'10px'} width={'120px'} />
              <Skeleton height={'8px'} width={'80px'} />
            </Stack>
          </Flex>
          <Skeleton height={'15px'} width={'300px'} />
          <Skeleton height={'10px'} width={'180px'} />
          <Skeleton height={'320px'} width={'full'} rounded={'20px'} />

        </Stack> : posts && posts?.map((post, i) => (
          <PostCard
            key={i}
            fullname={post.userId.fullName}
            username={post.userId.username}
            imgurl={post.imgUrl}
            title={post.title}
            body={post.description}
            postId={post._id}
            profileImg={post.userId.profileImg}
            commentsCount={post.commentsCount}
          />
        ))}
      </div>
      <div className='w-[36%] p-2 mb-5  rounded-lg'>
        <div className=' border border-gray-700  px-2 rounded-xl'>
          <h3 className='py-2 font-semibold text-lg'>Recent Posts</h3>
          <div>
            <div className='flex my-2 rounded-xl p-1'>
              <div className="left w-2/3">
                <div className='flex gap-1 items-center'>
                  <div><img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='w-6 rounded-full' alt="" /></div>
                  <div className='text-xs text-gray-400'>Kunal Khandelwal</div>
                </div>
                <div>Title of the post</div>
                <div className='text-xs pt-6 text-gray-400'>
                  4.8K upvotes · 1.2K comments
                </div>
              </div>
              <div className="w-1/3"><img src="http://localhost:8000/uploads/4a539513-28df-48e3-95ca-da56ad90d42e.png" alt="" /></div>
            </div>



          </div>
        </div>


        <div className='mt-5 border border-gray-700  px-2 rounded-xl'>
          <h3 className='py-2 font-semibold text-lg'>People to Follow</h3>

          <div>
            <div className='flex justify-between p-1 my-4'>
              <div className='flex gap-2'>
                <div><img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='w-10 rounded-full' alt="" /></div>
                <div>
                  <div className='text-sm font-semibold'>Kunal Khandelwal</div>
                  <div className='text-xs text-gray-400'>@kunal89204</div>
                </div>
              </div>
              <button className='bg-white text-black rounded-full px-8 text-sm'>Follow</button>
            </div>





            <div className='flex justify-between p-1 my-4'>
              <div className='flex gap-2'>
                <div><img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='w-10 rounded-full' alt="" /></div>
                <div>
                  <div className='text-sm font-semibold'>Kunal Khandelwal</div>
                  <div className='text-xs text-gray-400'>@kunal89204</div>
                </div>
              </div>
              <button className='bg-white text-black rounded-full px-8 text-sm'>Follow</button>
            </div>
            <div className='flex justify-between p-1 my-4'>
              <div className='flex gap-2'>
                <div><img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='w-10 rounded-full' alt="" /></div>
                <div>
                  <div className='text-sm font-semibold'>Kunal Khandelwal</div>
                  <div className='text-xs text-gray-400'>@kunal89204</div>
                </div>
              </div>
              <button className='bg-white text-black rounded-full px-8 text-sm'>Follow</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
