import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../Pages/Login'
import PostList from '../Pages/PostList'
import SignUp from '../Pages/Signup'
import UserList from '../Pages/UserList'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />}></Route>
            <Route path='/userAnalytics' element={<UserList />}></Route>
            <Route path='/postAnalytics' element={<PostList />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
    )
}

export default AllRoutes