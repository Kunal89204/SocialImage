import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Skeleton, Stack, Flex } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../components/EditProfileModal';
import axios from 'axios';
import { useAuthStore } from '../context/store';
import { FaInstagram, FaLinkedin, FaTwitter  } from "react-icons/fa";


const Profile = () => {
  const { username } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/userinfo/${username}`)
      .then((respo) => {
        setUserData(respo.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Ensure loading state is reset even if there's an error
      });
  }, [username]);

  useEffect(() => {
    if (user.user.username === username) {
      setIsProfile(true);
    }
  }, [username, user.user.username]);

  return (
    <div className='flex'>
      <div className='w-2/3 p-8'>
        {loading ? (
          <Stack spacing={4}>
            <Flex alignItems={'center'} gap={'8px'}>
              <Skeleton startColor="gray.700"
                endColor="gray.900" height="150px" width="150px" borderRadius="full" />
              <Box>
                <Skeleton height="30px" startColor="gray.700"
                endColor="gray.900"  width="200px" borderRadius={'20px'} />
                <Skeleton height="10px"  startColor="gray.700"
                endColor="gray.900"        marginY={'10px'} width="100px" borderRadius={'20px'} />
                <Skeleton height="10px" startColor="gray.700"
                endColor="gray.900" width="300px" borderRadius={'20px'} />
                <Skeleton height="10px" startColor="gray.700"
                endColor="gray.900" marginY={'5px'} width="300px" borderRadius={'20px'} />
              </Box>
            </Flex>
          </Stack>
        ) : (
          <>
            <div className='flex items-center gap-10'>
              <div className='rounded-full w-32 h-32 overflow-hidden'><img src={userData?.profileImg} alt="" className='rounded-full w-32 ' /></div>
              <div>
                <h1 className='text-3xl'>{userData.fullName}</h1>
                <h1 className='text-gray-500'>@{userData.username}</h1>
                <p className='text-gray-400 text-sm pt-2 max-w-80 line-clamp-3'>{userData.bio}</p>
              </div>
            </div>

            <div>
              <Box width="600px" margin="auto" padding="4">
                <Tabs variant="soft-rounded" colorScheme="teal">
                  <TabList>
                    <Tab margin={4}>Posts</Tab>
                    <Tab margin={4}>Comments</Tab>
                    <Tab margin={4}>Saved</Tab>
                    <Tab margin={4}>Upvotes</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <p>Posts data will be displayed here.</p>
                    </TabPanel>
                    <TabPanel>
                      <p>Comments data will be displayed here.</p>
                    </TabPanel>
                    <TabPanel>
                      <p>Saved items will be displayed here.</p>
                    </TabPanel>
                    <TabPanel>
                      <p>Upvotes data will be displayed here.</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </div>
          </>
        )}
      </div>
      <div className="w-1/3 ">
        <div className=" rounded-3xl fixed w-1/4 right-10 top-1/2 -translate-y-2/4 overflow-hidden shadow-2xl border border-gray-800 bg-gradient-to-br from-[#18181c] via-[#23232a] to-[#101014]">
          {/* Banner */}
          <div className="relative ">
            {loading ? (
              <Skeleton
                startColor="gray.700"
                endColor="gray.900"
                height="160px"
                width="full"
                borderRadius="0"
              />
            ) : (
              <img
                src={userData.bannerImg}
                alt="Banner"
                className="w-full h-40 object-cover"
                style={{ minHeight: 160, maxHeight: 182 }}
              />
            )}
            {/* Avatar overlay */}
            
          </div>
          {/* Card Content */}
          <div className="pt-14 pb-4 px-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                {loading ? (
                  <Skeleton
                    height="18px"
                    width="120px"
                    startColor="gray.700"
                    endColor="gray.900"
                    borderRadius="md"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-100">
                    @{userData.username}
                  </span>
                )}
              </div>
              {isProfile && (
                <Button
                  onClick={() => setModalOpen(true)}
                  colorScheme="teal"
                  size="sm"
                  rightIcon={<MdEdit />}
                  variant="outline"
                  borderRadius="full"
                  px={5}
                  fontWeight="bold"
                  _hover={{ bg: "teal.600", color: "white" }}
                >
                  Edit
                </Button>
              )}
            </div>
            {/* Stats */}
            <div className="flex justify-between items-center mt-4 mb-2">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-teal-400">
                  {loading ? <Skeleton height="20px" width="30px" /> : userData.followers?.length ?? 0}
                </span>
                <span className="text-xs text-gray-400">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-teal-400">
                  {loading ? <Skeleton height="20px" width="30px" /> : userData.following?.length ?? 0}
                </span>
                <span className="text-xs text-gray-400">Following</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-teal-400">
                  {loading ? <Skeleton height="20px" width="30px" /> : userData.postsCount ?? 0}
                </span>
                <span className="text-xs text-gray-400">Posts</span>
              </div>
            </div>
            {/* Birthday */}
            <div className="flex items-center justify-center gap-2 mt-2 mb-4">
              <span className="text-gray-400 text-sm">
                <span className="font-semibold text-gray-300">🎂 B'day:</span>{" "}
                {loading ? (
                  <Skeleton height="16px" width="60px" />
                ) : (
                  userData.birthday
                    ? new Date(userData.birthday).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })
                    : "Not set"
                )}
              </span>
            </div>
            {/* Socials */}
            <div className="mt-4">
              <h5 className="text-gray-300 font-semibold mb-2 text-sm tracking-wide">Socials</h5>
              <div className="flex gap-4 justify-center">
                {userData.socials?.instagram && (
                  <a
                    href={userData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition"
                  >
                    <FaInstagram className="text-2xl" />
                  </a>
                )}
                {userData.socials?.twitter && (
                  <a
                    href={userData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition"
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                )}
                {userData.socials?.linkedin && (
                  <a
                    href={userData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                )}
                {/* Fallback icons if no socials */}
                {!userData.socials && (
                  <>
                    <span className="opacity-40"><FaInstagram className="text-2xl" /></span>
                    <span className="opacity-40"><FaTwitter className="text-2xl" /></span>
                    <span className="opacity-40"><FaLinkedin className="text-2xl" /></span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        userData={userData}
      />
    </div>
  );
};

export default Profile;
