import { Button,TableRow, TableCell } from '@material-ui/core'
import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

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
      <Button color='secondary' size='small' onClick={blogDelete}>delete</Button>

    )
  }

  if (visible === true) {
    return (
      <TableRow>
        <TableCell>
          {blog.title} {blog.author}</TableCell>
        <TableCell align='left'>{blog.url}</TableCell>
        <TableCell align='left'>{blog.likes} <Button color='primary' size='small' onClick={addLike}>like</Button></TableCell>
        <TableCell align='left'>{blog.user.name} {deleteButton()}</TableCell>
        <TableCell align='right'><Button size='small' onClick={() => setVisible(false)}>hide</Button></TableCell>
      </TableRow>
    )
  } else {
    return (
      <TableRow>
        <TableCell>
          {blog.title} {blog.author}
        </TableCell>
        <TableCell align='left'>-</TableCell>
        <TableCell align='left'>-</TableCell>
        <TableCell align='left'>-</TableCell>
        <TableCell align='right'><Button size='small' onClick={() => setVisible(true)}>view</Button></TableCell>
      </TableRow>
    )
  }}

export default Blog