import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logout } from './reducers/loginReducer'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const addBlogRef = useRef()

  return (
    <Router>
      <div>
        <Notification />
        {user === null ?
          <LoginForm /> :
          <div>
            <p className="container user-nav">logged in as {user.name}<button onClick={() => dispatch(logout())}>logout</button></p>
            <Switch>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Togglable buttonLabel="new blog" ref={addBlogRef}>
                  <BlogForm />
                </Togglable>
                <Blogs user={user} />
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Router>
  )
}

export default App