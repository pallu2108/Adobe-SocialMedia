import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/Auth/action';

const initial = {
    email: "",
    password: ""
}
const SignIn = () => {
    const [user, setUser] = useState(initial);
    const toast = useToast()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((store) => store.AuthReducer.isLoading);


    const handleSignIn = (payload) => {
        dispatch(loginUser(payload))
            .then((r) => {
                toast({
                    title: (r.errmsg ? r.errmsg : r.successmsg),
                    status: (r.errmsg ? 'error' : 'success'),
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                })
                if (r.successmsg) navigate('/');
            })
    };

    useEffect(() => {
    }, [dispatch]);

    const handle = (e) => {
        const { name: key, value } = e.target
        setUser({ ...user, [key]: value })
    }

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login to your account</Heading>
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input onChange={handle} placeholder={"Enter Email ID"} value={user.email} name='email' type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input onChange={handle} placeholder={"Enter Password"} value={user.password} name='password' type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            {
                                isLoading ?
                                    <Button isLoading
                                        loadingText='Loading'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='start' bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>
                                        Sign in
                                    </Button> :
                                    <Button bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={() => handleSignIn(user)}>
                                        Sign in
                                    </Button>
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default SignIn