import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, FormControl, FormLabel, Heading, HStack, Icon, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BiLike } from 'react-icons/bi'
import { deletePost, getAllPosts, postPosts, updatePost } from '../Redux/App/actions/Post.action';
import { getAllUsers } from '../Redux/App/actions/User.action';
import { FiEdit, FiDelete, FiPlus } from 'react-icons/fi'
import { toastAlert } from '../Components/utils/ToastAlert';

const initial = {
    content: "",
    user_id: ""
}

const PostList = () => {
    const [newPost, setNewPost] = useState(initial);
    const [onedit, setOnEdit] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const posts = useSelector((state) => state.AppReducer.posts) || [];
    const users = useSelector((state) => state.AppReducer.users) || [];
    console.log(posts)


    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [])

    const handleCourseDetail = (event) => {
        const { name, value } = event.target
        setNewPost({
            ...newPost,
            [name]: value,
        })
        if (name === "user_id") {
            const user = users?.find((el) => value == el.email);
            // console.log("user", user)
            setNewPost({
                ...newPost,
                [name]: value, user_id: user?._id
            })
        }
    }
    // console.log(newPost)
    const submitData = (data) => {
        dispatch(postPosts(data)).then((r) => {
            if (r.successmsg) {
                toastAlert(toast, r.successmsg, "success")
            }
        })
        dispatch(getAllPosts());
        setNewPost(initial)
    }

    const showDetails = (id) => {
        // console.log(id)
        let updated_post = posts?.find((el) => el._id == id);
        // console.log(update_lecture);
        setNewPost({ id: updated_post._id, ...updated_post })
    }

    const updateData = (id, data) => {
        dispatch(updatePost(id, data)).then((r) => {
            if (r.successmsg) {
                toastAlert(toast, r.successmsg, "success")
            }
        })
        dispatch(getAllPosts());
        setNewPost(initial)
    }


    return (
        <VStack width={["95%", "95%", "80%"]} margin={"auto"} marginY={["15px", "40px", "100px"]} gap={'2'}>
            <Button width={["95%", "95%", "80%"]} float={"right"} leftIcon={<FiPlus />} onClick={onOpen}>
                Add
            </Button >
            {posts.length > 0 && posts.map((el) => {
                return <Card borderTopLeftRadius={'10px'} borderTopEndRadius={'10px '} width={["100%", "80%", "80%"]} margin={"auto"}>
                    <CardHeader borderTopLeftRadius={'10px'} borderTopEndRadius={'10px '} bg={"#edf2f7"} p={'15px'}>
                        <HStack justifyContent={'space-between'}>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <Heading size='sm'>{users?.find((elem) => elem?._id == el?.user_id)?.name ? users?.find((elem) => elem?._id == el?.user_id)?.name : users?.find((elem) => elem?._id == el?.user_id)?.email}</Heading>
                                    </Box>
                                </Flex>
                            </Flex>
                            <HStack gap={'3'} pr={"10px"} >
                                <Icon onClick={() => {
                                    setOnEdit(true);
                                    showDetails(el._id);
                                    onOpen()
                                }}
                                    cursor={'pointer'} as={FiEdit} />
                                <Icon
                                    onClick={() => {
                                        dispatch(deletePost(el._id)).then((r) => {
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

                    <CardBody minH={"150px"}>
                        <Text>
                            {el.content}
                        </Text>
                    </CardBody>

                    <Divider />

                    <CardFooter borderBottomLeftRadius={'10px'} borderBottomEndRadius={'10px '}
                        bg={'#edf2f7'}
                        p={'5px'}
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}>
                        <Button colorScheme={'red'} flex='1' variant='ghost' leftIcon={<BiLike />}>
                            {el.likes} Like
                        </Button>
                    </CardFooter>
                </Card>
            })
            }





            <Modal
                closeOnOverlayClick={false}
                size={'xl'}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{onedit ? "Update Post Details" : "Add Post Details"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Content </FormLabel>
                            <Textarea onChange={handleCourseDetail} name='content' value={newPost.content} placeholder='Describe your Thoughts..' maxLength={300} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>User</FormLabel>
                            <Select onChange={handleCourseDetail} name="user_id" >
                                <option>Select User</option>
                                {users?.length > 0 ? users?.map((elem) => {
                                    return <option>{elem.email}</option>
                                })
                                    :
                                    <Text>No Users is Availiable</Text>
                                }
                            </Select>
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={
                                onedit ?
                                    () => {
                                        onClose();
                                        updateData(newPost._id, newPost);
                                        setOnEdit(false);
                                    }
                                    :
                                    () => {
                                        onClose();
                                        submitData(newPost);
                                    }}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => {
                            setOnEdit(false);
                            onClose();
                            setNewPost(initial)
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}

export default PostList