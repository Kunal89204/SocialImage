import React, { useEffect, useState } from 'react'
import { useFollowStore, useAuthStore } from '../context/store'
import { VStack, Box, Image, Text, Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MdCancel } from "react-icons/md";
import {fetchData} from "../hooks/useFetchData"



const Requests = () => {
    const { user } = useAuthStore()
    const [followRequests, setFollowRequests] = useState([])
    const userId = user?.user?._id

    const getData = async () => {
        try {
            const response = await fetchData.getfollowers(user.accessToken, userId)
            setFollowRequests(response)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    useEffect(() => {
        getData()
        
    }, [userId])

   
    return (
        <div>
            <h2>Follow Requests</h2>


            <VStack>

                {followRequests.length === 0 ? (
                    <p>No follow requests</p>
                ) : (
                    
                        <>
                        {followRequests && followRequests.map((request) => (
                            <HStack justifyContent={'space-between'} key={request._id} bg={'gray.800'} p={4} rounded={10} gap={20} width={'460px'}>
                                <HStack>
                                    <Link to={`/${request.user.username}`}><Image height={'50px'} width={'50px'} rounded={'full'} src={request.user.profileImg} /></Link>
                                    <VStack gap={'0px'} alignItems={'start'}>
                                        <Link to={`/${request.user.username}`}>
                                            <Text fontSize={20}>{request.user.fullName}</Text></Link>
                                        <Link to={`/${request.user.username}`}> <Text color={'gray.400'}>{request.user.username}</Text></Link>
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
