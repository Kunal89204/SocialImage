import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Skeleton, Stack, Flex } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../components/EditProfileModal';
import axios from 'axios';
import { useAuthStore } from '../context/store';

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
      <div className='w-1/3'>
        <div className='sticky top-32 border border-gray-700 right-10 rounded-2xl overflow-hidden'>
          <div>{loading ? <Skeleton startColor="gray.700"
                endColor="gray.900" height={'150px'} maxHeight="182px" width="full" /> : <img src={userData.bannerImg} alt="" className='max-h-[182px] min-w-full' />}</div>
          <div className='p-2'>
            <div className='flex justify-between py-2'>
              <div>{loading?<Skeleton height={'15px'} startColor="gray.700"
                endColor="gray.900" width={'100px'}/>:userData.username}</div>
              {isProfile && (
                <Button onClick={() => setModalOpen(true)} colorScheme="teal" size="sm" rightIcon={<MdEdit />}>
                  Edit Profile
                </Button>
              )}
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
