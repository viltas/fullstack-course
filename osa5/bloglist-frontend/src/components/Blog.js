import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const addLike = (event) => {
    event.preventDefault()
    likeBlog({ blog })
  }

  const blogDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`${blog.title} will be deleted. Proceed?`)) {
      deleteBlog(blog.id)
    }
  }

  const deleteButton = () => {
    if (user.username !== blog.user.username) {
      return ''
    }
    return (
      <button onClick={blogDelete}>delete</button>

    )
  }

  if (visible === true) {
    return (
      <div id={blog.title} className={'blog'} style={blogStyle}>
        {blog.title} {blog.author}
        <div className='blog-full'>
          <p>url: {blog.url}</p>
          <p> likes: {blog.likes} <button onClick={addLike}>like</button></p>
          <p>{blog.user.name} {deleteButton()}</p>
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
      </div>
    )
  } else {
    return (
      <div id={blog.title} className={'blog'} style={blogStyle}>
        {blog.title} {blog.author}
        <div className='view-button'>
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      </div>
    )
  }}

export default Blog