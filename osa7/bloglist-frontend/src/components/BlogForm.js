import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField, Typography } from '@material-ui/core'


const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant='h6'>Create new</Typography>
      <form onSubmit={addBlog}>

        <TextField
          margin='normal'
          label='title'
          size='small'
          variant='filled'
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}/><br />

        <TextField
          margin='normal'
          label='author'
          size='small'
          variant='filled'
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}/><br />

        <TextField
          margin='normal'
          label='url'
          size='small'
          variant='filled'
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}/><br />



        <Button variant='outlined' color='primary' type="submit">create</Button>
      </form></div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm