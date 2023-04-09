import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, getTopLikedPosts } from '../Redux/App/actions/Post.action';
import { getAllUsers } from '../Redux/App/actions/User.action';

const PostAnalytics = () => {
    const dispatch = useDispatch();
    const top_posts = useSelector((state) => state.AppReducer.topLikedPosts) || [];
    const posts = useSelector((state) => state.AppReducer.posts) || [];
    const users = useSelector((state) => state.AppReducer.users) || [];
    console.log((top_posts))

    useEffect(() => {
        dispatch(getTopLikedPosts());
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [])

    return (
        <Box width={["100%", "80%", "60%"]} margin={'auto'} marginY={["15px", "40px", "100px"]}>
            <Text width={'100%'} margin={'auto'} fontSize={'25px'} fontWeight={"400"}> <span style={{ fontSize: "50px", color: "red", fontWeight: 600 }}>0{posts?.length}</span> Total number of post are there </Text>
            <br />
            <VStack gap={"5"}>
                {top_posts.length > 0 && top_posts.map((item, index) => {
                    return <VStack paddingX={"20px"} align={"start"} borderLeft={"1px solid black"} borderRadius={"10px"} VStack width={"100%"} >
                        <Text width={'100%'} fontSize={'19px'} fontWeight={"600"}> <span style={{ fontSize: "25px", color: "red", fontWeight: 600 }}>0{index + 1}</span> <span style={{ fontSize: "15px" }}>posted by</span> {users?.find((elem) => elem?._id == item?.user_id)?.name ? users?.find((elem) => elem?._id == item?.user_id)?.name : users?.find((elem) => elem?._id == item?.user_id)?.email}</Text>
                        <Text >Content as {item.content}</Text>
                        <Text >with likes <span style={{ fontWeight: "400", color: "red" }}>{item.likes}</span></Text>
                    </VStack>
                })}
            </VStack>
        </Box >
    )
}

export default PostAnalytics