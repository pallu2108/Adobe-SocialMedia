import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, getTopLikedPosts } from '../Redux/App/actions/Post.action';
import { getAllUsers, getTopActiveUsers } from '../Redux/App/actions/User.action';

const UserAnalytics = () => {
    const dispatch = useDispatch();
    const top_users = useSelector((state) => state.AppReducer.topActiveUsers) || [];
    const posts = useSelector((state) => state.AppReducer.posts) || [];
    const users = useSelector((state) => state.AppReducer.users) || [];
    console.log((top_users))

    useEffect(() => {
        dispatch(getTopActiveUsers());
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [])

    return (
        <Box width={["100%", "80%", "60%"]} margin={'auto'} marginY={["15px", "40px", "100px"]}>
            <Text width={'100%'} margin={'auto'} fontSize={'25px'} fontWeight={"400"}> <span style={{ fontSize: "50px", color: "red", fontWeight: 600 }}>0{users?.length}</span> Total number of users are there </Text>
            <br />
            <VStack gap={"5"}>
                {top_users.length > 0 && top_users.map((item, index) => {
                    return <VStack paddingX={"20px"} align={"start"} borderLeft={"1px solid black"} borderRadius={"10px"} VStack width={"100%"} >
                        <Text width={'100%'} fontSize={'19px'} fontWeight={"600"}> <span style={{ fontSize: "25px", color: "red", fontWeight: 600 }}>0{index + 1}</span> {item.user?.name ? item.user?.name : item.user?.email} <span style={{ fontSize: "15px" }}> has posted </span> <span style={{ fontWeight: "400", color: "red" }}>{item.count}</span> <span style={{ fontSize: "15px" }}> posts till now </span></Text>
                    </VStack>
                })}
            </VStack>
        </Box >
    )
}

export default UserAnalytics