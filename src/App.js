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
import { Typography, Button, Container, AppBar, Toolbar, makeStyles, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainpage: {
    marginTop: "100px"
  }
}))

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrormessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogVisible, setblogVisible] = useState(false)
  const classes = useStyles()

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
      setErrormessage(exception.response.data.error)
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
      <div className={classes.root}>
        <Notification message={message} errormessage={errormessage} />
        {user === null ?
          <Container>
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" edge="start" className={classes.title}>
                  Web Dev Diaries
                </Typography>
              </Toolbar>
            </AppBar>
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
            </Switch>
          </Container> :
          <Container>
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" edge="start" className={classes.title}>
                  Web Dev Diaries
                </Typography>
                <Typography >{user.username}</Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Toolbar>
            </AppBar>
            <Container className={classes.mainpage}>
              <Grid container spacing={3}>
                {blogs.map(blog => {
                  return (
                    <Grid item key={blog.id} xs={12} sm={12} md={6} direction="row"
                      justifyContent="center"
                      alignItems="center">
                      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
                    </Grid>
                  )
                }
                )}
              </Grid>
              {blogForm()}
            </Container>
          </Container>
        }
      </div>
    </Router>
  )
}

export default App