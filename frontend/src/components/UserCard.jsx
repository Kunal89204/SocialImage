import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Button, Stack, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../context/store';
import FollowButton from './props/FollowButton';




const UserCard = ({ profileImg, fullName, username, personId }) => {
  const { user } = useAuthStore()

  return (
    <Box
      maxW="sm"
      height="auto" 
      minH="250px"
      maxH={'320px'} 
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="5"
      bg="black"
      color="white"
      _hover={{ boxShadow: 'lg' }}
      borderColor={"gray"}
    >
      <Image
        borderRadius="full"
        boxSize="150px"
        src={profileImg}
        alt={`${fullName}'s profile`}
        mx="auto"
      />
      <Stack spacing={3} mt={4} align="center">
        <Heading size="md">{fullName}</Heading>
        <Text color="gray.400" fontSize="sm">@{username}</Text>
        <Stack direction="row" spacing={4}>
          <Link to={`/${username}`}> <Button  borderRadius={'full'} textColor={'white'} _hover={{
            textColor: 'black',
            backgroundColor: 'white'
          }} variant="outline" borderColor="white">
            Visit Profile
          </Button></Link>

          <FollowButton username={username} personId={personId} />

        </Stack>
      </Stack>
    </Box>
  );
};

export default UserCard;
