import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import UserCard from '../components/UserCard'; // Adjust the import path as needed
import axios from 'axios';
import { useAuthStore } from '../context/store';
import { fetchData } from '../hooks/useFetchData';


const Explore = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  const { user } = useAuthStore(); // Get current user from context

  const fetchUsers = async () => {
    const response = await fetchData.getUsers(user?.accessToken, user?.user?.username)
    setUsers(response)
  }

  useEffect(() => {
    // Fetch users from API
    fetchUsers()
  }, [user?.accessToken, user?.user?.username]);

  return (
    <Stack spacing={8} p={5} direction={{ base: 'column', md: 'row' }} wrap="wrap" bg="black" minH="100vh">
      {users.map((user, index) => (
        <UserCard
          key={index}
          profileImg={user.profileImg}
          fullName={user.fullName}
          username={user.username}
          personId={user._id}
        />
      ))}
    </Stack>
  );
};

export default Explore;
