import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrormessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
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
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setblogVisible(true)}>Create New Blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            username={username}
            createBlog={createBlog}
          />
          <button onClick={() => setblogVisible(false)}>cancel</button>
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
      const request = blogService.Delete(blog.id)
      setMessage(`blog ${blog.title} by ${blog.author} has been deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(request)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errormessage={errormessage} />
      {user === null ?
        <div>{loginForm()}</div> :
        <div>
          <p>{user.name} logged-in</p><button onClick={handleLogout}>Logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
          )}
        </div>
      }
    </div>
  )
}

export default App