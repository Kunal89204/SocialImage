import React, { useEffect } from 'react'
import { useFollowStore, useAuthStore } from '../context/store'
import { VStack, Box, Image, Text, Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MdCancel } from "react-icons/md";



const Requests = () => {
    const { user } = useAuthStore()
    const { followRequests, fetchFollowRequests, loading, error } = useFollowStore()
    const userId = user?.user?._id

    useEffect(() => {
        fetchFollowRequests(userId)
    }, [userId])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <h2>Follow Requests</h2>


            <VStack>

                {followRequests.length === 0 ? (
                    <p>No follow requests</p>
                ) : (
                    
                        <>
                        {followRequests.map((request) => (
                            <HStack justifyContent={'space-between'} key={request._id} bg={'gray.800'} p={4} rounded={10} gap={20} width={'460px'}>
                                <HStack>
                                    <Link to={`/${request.follower.username}`}><Image height={'50px'} width={'50px'} rounded={'full'} src={request.follower.profileImg} /></Link>
                                    <VStack gap={'0px'} alignItems={'start'}>
                                        <Link to={`/${request.follower.username}`}>
                                            <Text fontSize={20}>{request.follower.fullName}</Text></Link>
                                        <Link to={`/${request.follower.username}`}> <Text color={'gray.400'}>{request.follower.username}</Text></Link>
                                    </VStack>
                                </HStack>
                                <HStack>
                                    <Button height={8}>Accept</Button>
                                    <MdCancel color='black' size={25} />
                                </HStack>

                            </HStack>
                        ))}
                        </>
                    
                )}

            </VStack>
        </div>
    )
}

export default Requests
