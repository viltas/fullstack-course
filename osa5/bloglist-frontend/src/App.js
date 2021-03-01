import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes),
      )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage(`a blog '${blogObj.title} by ${blogObj.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
  }

  const likeBlog = ({ blog }) => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(blog.id, likedBlog)
      .then(returnedBlog => {
        const newBlogs = blogs.filter(item => item !== blog)
        newBlogs.push(returnedBlog)
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      })
  }


  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter((item) => item.id !== id))
      })
  }


  const Message = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="message">
        <h3 style={{ color: 'green' }}>{message}</h3>
      </div>
    )
  }

  const ErrorMessage = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }
    return (
      <div className="errorMessage">
        <h3 style={{ color: 'red' }} >{errorMessage}</h3>
      </div>
    )
  }

  const BlogList = () => {
    return (
      <div id={'blogs-list'}>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
      )}</div>
    )
  }


  const loggedIn = () => (
    <div><p>
      Welcome, {user.name}
    </p>
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form><p></p>
    <Togglable className={'new-blog'} buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog} /></Togglable>
    {BlogList()}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Message message={message} />
      <ErrorMessage style={{ color: 'red' }} errorMessage={errorMessage} />


      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} /></Togglable> :
        loggedIn()
      }

    </div>
  )
}

export default App