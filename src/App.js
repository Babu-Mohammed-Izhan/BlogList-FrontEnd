import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import Notification from './Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import RegisterForm from './components/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Typography, Button, Container } from '@material-ui/core'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrormessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogVisible, setblogVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    getAllBlog()

  }, [])

  const getAllBlog = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
    setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrormessage('Wrong credentials')
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    console.log("This works")
    console.log(username, password)
    try {
      const newuser = await registerService.register({
        username: username, password: password
      })
      console.log(newuser)
      setMessage(`${username} account has been created!!`)
      setTimeout(() => {
        setMessage(null)
        history.go('/')
      }, 5000)
      setPassword('')
    } catch (exception) {
      console.log(exception.response.data)
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    history.go("/")
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={hideWhenVisible}>
          <Button variant="contained" colour="primary" onClick={() => setblogVisible(true)}>Create New Blog</Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            username={username}
            createBlog={createBlog}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button variant="contained" colour="primary" onClick={() => setblogVisible(false)}>cancel</Button>
          </div>
        </div>
      </div>
    )
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      console.log(title, author, url)
      const blog = await blogService.create({
        title, author, url,
      })
      console.log(blog)
      setMessage(`a new blog ${title} by ${author} is added`)
      setblogVisible(false)
      getAllBlog()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrormessage(exception)
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const likes = blog.likes + 1
    const updatedBlog = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const newBlog = await blogService.update(blog.id, updatedBlog)
    console.log(newBlog)
    getAllBlog()
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
      try {
        const request = blogService.Delete(blog.id)
        setMessage(`blog ${blog.title} by ${blog.author} has been deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        getAllBlog()
        console.log(request)
      } catch (exception) {
        setErrormessage(exception)
        setTimeout(() => {
          setErrormessage(null)
        }, 5000)
      }

    }
  }

  return (
    <Router>
      <div className="app">
        <Typography style={{ fontSize: "70px", margin: '0px' }}>Web Dev Diaries</Typography>
        <Notification message={message} errormessage={errormessage} />
        {user === null ?
          <Switch>
            <Route exact path="/">
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin} />
            </Route>
            <Route exact path="/register">
              <RegisterForm
                handleRegister={handleRegister}
                handleRegisterUsernameChange={({ target }) => setUsername(target.value)}
                handleRegisterPasswordChange={({ target }) => setPassword(target.value)}
                Registerusername={username}
                Registerpassword={password} />
            </Route>
          </Switch> :
          <Container>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "20px" }}>
              <Typography align="center" >{user.username} is logged-in</Typography>
              <Button color="secondary" variant="outlined" onClick={handleLogout}>Logout</Button>
            </div>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            )}
          </Container>
        }
      </div>
    </Router>
  )
}

export default App