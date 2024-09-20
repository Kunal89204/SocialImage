import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../context/store';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { fetchData } from '../../hooks/useFetchData';

const FollowButton = ({ username, personId }) => {
  const { user } = useAuthStore();
  const [followState, setFollowState] = useState('Follow');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const followStatus = async () => {
   const response = await fetchData.getFollowStatus(user.accessToken, user?.user?._id, personId)
   console.log(response.data)
   setFollowState(response.data.status)
  }


  useEffect(() => {
    followStatus()
  }, [followStatus]);

  const handleFollow = () => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/${user?.user?._id}`, { username })
      .then((respo) => {
        followStatus();
       
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: 'Error',
          description: "Failed to update follow status.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Button
      onClick={handleFollow}
      textColor={followState === 'Follow'? 'black' : 'white'}
      _hover={{
        textColor: followState === 'Follow'? 'black' : 'white',
        backgroundColor: followState === 'Follow'? 'white' : 'gray'
      }}
      borderRadius={'full'}
      backgroundColor={followState === 'Follow' ? 'white' : 'gray'}
      isDisabled={loading }
    >
      {loading ? <Spinner size="sm" /> : followState}
    </Button>
  );
};

export default FollowButton;
