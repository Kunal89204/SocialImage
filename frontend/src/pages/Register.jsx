import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';
import {
  Alert, AlertIcon, AlertTitle, AlertDescription,
  Button, FormControl, FormLabel, Input, Box, Heading, Text, VStack, Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Register = () => {
  const { registerHook } = useRegister();
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password, fullName };
    const result = await registerHook(data);

    if (result) {
      setAlertMessage(result);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    } else {
      setAlert(false);
    }
  };

  return (
    <Box className="h-screen w-screen flex justify-center items-center bg-[#111827]" color="gray.200">
      {alert && (
        <Alert status='error' variant='subtle' position="absolute" top="5" w="auto" maxW="sm">
          <AlertIcon />
          <VStack align="start">
            <AlertTitle>{alertMessage}</AlertTitle>
            <AlertDescription>
              {alertMessage === "User doesn't exist" ? "Please Register" : alertMessage}
            </AlertDescription>
          </VStack>
        </Alert>
      )}
      <Box w="full" maxW="md" bg="#1A202C" p={8} rounded="lg" boxShadow="2xl">
        <Heading textAlign="center" mb={6} fontSize="3xl">Social Image</Heading>
        <Heading textAlign="center" mb={8} fontSize="2xl" fontWeight="medium">Register</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="fullname">
              <FormLabel>Full Name</FormLabel>
              <Input type="text" value={fullName} required onChange={(e) => setFullname(e.target.value)} bg="#2D3748" border="1px solid" borderColor="gray.600" _hover={{ borderColor: "gray.400" }} _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan.400" }} />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} bg="#2D3748" border="1px solid" borderColor="gray.600" _hover={{ borderColor: "gray.400" }} _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan.400" }} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="#2D3748" border="1px solid" borderColor="gray.600" _hover={{ borderColor: "gray.400" }} _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan.400" }} />
            </FormControl>
            <Button type="submit" bg="cyan.600" color="white" w="full" mt={4} _hover={{ bg: "cyan.500" }} transition="all 0.2s">Register</Button>
          </VStack>
        </form>
        <Text mt={6} textAlign="center">
          Already have an account?{' '}
          <ChakraLink as={Link} to="/login" color="cyan.400" _hover={{ textDecoration: "underline" }}>
            Login
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
