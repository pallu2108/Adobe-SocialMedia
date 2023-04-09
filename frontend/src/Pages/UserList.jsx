import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BiLike } from 'react-icons/bi'
import { getAllUsers } from '../Redux/App/actions/User.action';

const UserList = () => {
    const users = useSelector((state) => state.AppReducer.users) || [];
    console.log(users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    return (
        <Box width={["100%", "80%", "80%"]} margin={'auto'}>
            <Card width={["100%", "80%", "80%"]} margin={"auto"}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='sm'>Segun Adebayo</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        With Chakra UI, I wanted to sync the speed of development with the speed
                        of design. I wanted the developer to be just as excited as the designer to
                        create a screen.
                    </Text>
                </CardBody>
                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                    </Button>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default UserList