import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';


export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box fontWeight={'700'} fontSize={"20px"}>YouSocial</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <Link to={'/userlist'}>users</Link>
                            <Link to={'/postlist'}>posts</Link>
                            <Link to={'/userAnalytics'}>UserAnalytics</Link>
                            <Link to={'/postAnalytics'}>postAnalytics</Link>
                        </HStack>
                    </HStack>

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Link to={'/userlist'}>users</Link>
                            <Link to={'/postlist'}>posts</Link>
                            <Link to={'/userAnalytics'}>UserAnalytics</Link>
                            <Link to={'/postAnalytics'}>postAnalytics</Link>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}