import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, FormControl, FormLabel, Heading, HStack, Icon, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../Redux/App/actions/Post.action';
import { deleteUsers, getAllUsers, postUser, updateUsers } from '../Redux/App/actions/User.action';
import { FiEdit, FiDelete, FiPlus } from 'react-icons/fi'
import { toastAlert } from '../Components/utils/ToastAlert';

const initial = {
    name: "",
    bio: "",
    email: "",
}

const UserList = () => {
    const [newUser, setNewUser] = useState(initial);
    const [onedit, setOnEdit] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const users = useSelector((state) => state.AppReducer.users) || [];
    const posts = useSelector((state) => state.AppReducer.posts) || [];
    console.log(users)

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllPosts());
    }, [])

    const handleCourseDetail = (event) => {
        const { name, value } = event.target
        setNewUser({
            ...newUser,
            [name]: value,
        })
    }
    // console.log(newUser)
    const submitData = (data) => {
        dispatch(postUser(data)).then((r) => {
            if (r.successmsg) {
                toastAlert(toast, r.successmsg, "success")
            }
        })
        dispatch(getAllUsers());
        setNewUser(initial)
    }
    console.log(newUser)
    const showDetails = (id) => {
        // console.log(id)
        let updated_user = users?.find((el) => el._id == id);
        // console.log(update_lecture);
        setNewUser({ id: updated_user._id, ...updated_user })
    }

    const updateData = (id, data) => {
        dispatch(updateUsers(id, data)).then((r) => {
            if (r.successmsg) {
                toastAlert(toast, r.successmsg, "success")
            }
        })
        dispatch(getAllUsers());
        setNewUser(initial)
    }

    return (
        <VStack width={["95%", "95%", "80%"]} margin={"auto"} marginY={["15px", "40px", "100px"]} gap={'2'}>
            <Button width={["95%", "95%", "80%"]} float={"right"} leftIcon={<FiPlus />} onClick={onOpen}>
                Add
            </Button >
            {
                users.length > 0 && users.map((item) => {
                    return <Card borderTopLeftRadius={'10px'} borderTopEndRadius={'10px '} width={["100%", "80%", "80%"]} margin={"auto"}>
                        <CardHeader bg={'#edf2f7'} borderTopLeftRadius={'10px'} borderTopEndRadius={'10px'} padding={"15px"} paddingX={"20px"}>
                            <HStack justifyContent={'space-between'}>
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Box>
                                            <Heading size='sm'>{item.name ? item.name : "Please update your name"}</Heading>
                                            <Text>{item.email}</Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                                <HStack gap={'5'} >
                                    <Icon onClick={() => {
                                        setOnEdit(true);
                                        showDetails(item._id);
                                        onOpen()
                                    }}
                                        cursor={'pointer'} as={FiEdit} />
                                    <Icon
                                        onClick={() => {
                                            dispatch(deleteUsers(item._id)).then((r) => {
                                                if (r.successmsg) {
                                                    toastAlert(toast, r.successmsg, "success")
                                                }
                                            })
                                        }}
                                        cursor={'pointer'} as={FiDelete} />
                                </HStack>
                            </HStack>
                        </CardHeader>
                        <Divider />

                        <CardBody>
                            <Text maxH={"200px"} overflow={'auto'}>
                                Bio : {item.bio ? item.bio : "Please Update the bio"}
                            </Text>
                            <Text>
                                Posts :  {posts.filter((el) => el.user_id == item._id).length}
                            </Text>
                        </CardBody>
                    </Card >
                })
            }
            <Modal
                closeOnOverlayClick={false}
                size={'xl'}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{onedit ? "Update User Details" : "Add User Details"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Name </FormLabel>
                            <Input onChange={handleCourseDetail} name='name' value={newUser.name} placeholder='Enter Your name' maxLength={300} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Email </FormLabel>
                            <Input onChange={handleCourseDetail} name='email' value={newUser.email} placeholder='Enter Your email' maxLength={300} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Bio (optional)</FormLabel>
                            <Textarea onChange={handleCourseDetail} name='bio' value={newUser.bio} placeholder='Describe your Bio..' maxLength={300} />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={
                                onedit ?
                                    () => {
                                        onClose();
                                        updateData(newUser._id, newUser);
                                        setOnEdit(false);
                                    }
                                    :
                                    () => {
                                        onClose();
                                        submitData(newUser);
                                    }}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => {
                            setOnEdit(false);
                            onClose();
                            setNewUser(initial)
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack >
    )
}

export default UserList