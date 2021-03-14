import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'


const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {


  return(
    <form onSubmit={handleLogin}>

      <TextField
        margin='normal'
        label='username'
        size='small'
        id={'username'}
        type="text"
        variant='filled'
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <TextField
        margin='normal'
        label='password'
        size='small'
        id={'password'}
        type="password"
        variant='filled'
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <Button variant='outlined' id={'login-button'} type="submit">login</Button>
    </form>
  )}


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm