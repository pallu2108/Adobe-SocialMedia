import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostAnalytics from '../Pages/PostAnalytics'
import PostList from '../Pages/PostList'
import UserAnalytics from '../Pages/UserAnalytics'
import UserList from '../Pages/UserList'

const AllRoutes = () => {
    return (
        <Routes>
            {/* <Route path='/login' element={<SignIn />}></Route> */}
            <Route path='/userAnalytics' element={<UserAnalytics />}></Route>
            <Route path='/postAnalytics' element={<PostAnalytics />}></Route>
            <Route path='/userList' element={<UserList />}></Route>
            <Route path='/postList' element={<PostList />}></Route>
        </Routes>
    )
}

export default AllRoutes