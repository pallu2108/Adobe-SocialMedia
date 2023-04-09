import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BiLike } from 'react-icons/bi'
import { getAllPosts } from '../Redux/App/actions/Post.action';
import { getAllUsers } from '../Redux/App/actions/User.action';

const PostList = () => {

    const posts = useSelector((state) => state.AppReducer.posts) || [];
    const users = useSelector((state) => state.AppReducer.users) || [];
    console.log(posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [])

    let user = users?.find((elem) => {
        console.log(elem)
        return elem?._id == posts[0]?.user_id
    })

    console.log(user?.email)

    return (
        <VStack width={["95%", "95%", "80%"]} margin={"auto"} marginY={["15px", "40px", "100px"]} gap={'2'}>
            {posts.length > 0 && posts.map((el) => {
                return <Card borderTopLeftRadius={'10px'} borderTopEndRadius={'10px '} width={["100%", "80%", "80%"]} margin={"auto"}>
                    <CardHeader borderTopLeftRadius={'10px'} borderTopEndRadius={'10px '} bg={"red.200"} p={'15px'}>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Box>
                                    <Heading size='sm'>{users?.find((elem) => elem?._id == el?.user_id)?.name ? users?.find((elem) => elem?._id == el?.user_id)?.name : users?.find((elem) => elem?._id == el?.user_id)?.email}</Heading>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>

                    <Divider />

                    <CardBody minH={"150px"}>
                        <Text>
                            {el.content}
                        </Text>
                    </CardBody>

                    <Divider />

                    <CardFooter borderBottomLeftRadius={'10px'} borderBottomEndRadius={'10px '}
                        bg={'red.200'}
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
        </VStack>
    )
}

export default PostList