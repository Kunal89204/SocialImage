import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Button, FormControl, FormLabel, Input, Box, Heading, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loginHook } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, password };
        const result = await loginHook(data);

        if (result) {
            setAlertMessage(result);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000); // Show alert for 3 seconds
        } else {
            setAlert(false);
        }
    };

    return (
        <Box className="h-screen w-screen flex justify-center items-center bg-[#0F0F0F]" color="gray.200">
            {alert && (
                <Alert status='error' variant='subtle' position="absolute" top="5" w="auto" maxW="sm">
                    <AlertIcon />
                    <VStack align="start">
                        <AlertTitle>{alertMessage}</AlertTitle>
                        <AlertDescription>
                            {alertMessage === "User doesn't exist" ? "Please register" : "Please enter correct credentials"}
                        </AlertDescription>
                    </VStack>
                </Alert>
            )}
            <Box w="full" maxW="md" className='custom-bg-gradient' p={8} rounded="lg" boxShadow="2xl">
                <Heading textAlign="center" mb={6} fontSize="3xl" color={'gray'}>Social Image</Heading>
                <Heading textAlign="center" mb={8} fontSize="2xl" fontWeight="medium" color={'gray'}>Login</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='custom-bg-gradient' border="1px solid" borderColor="#323232" _hover={{ borderColor: "gray.400" }} _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan.400" }} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='custom-bg-gradient' border="1px solid" borderColor="#323232" _hover={{ borderColor: "gray.400" }} _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan.400" }} />
                        </FormControl>
                        <Button type="submit" bg="#222222" color="white" w="full" mt={4} _hover={{ bg: "white", color: "black" }} transition="all 0.2s">Login</Button>
                    </VStack>
                </form>
                <Text mt={6} textAlign="center">
                    Don't have an account?{' '}
                    <ChakraLink as={Link} to="/register" color="cyan.400" _hover={{ textDecoration: "underline" }}>
                        Register
                    </ChakraLink>
                </Text>
            </Box>
        </Box>
    );
};

export default Login;
