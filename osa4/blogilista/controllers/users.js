const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1})
  response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if (!user.username || !body.password) {
    response.status(400).end()
  }

  if (user.username.length > 2 && body.password.length > 2) {
    const savedUser = await user.save()
    response.json(savedUser)
  } else {
    response.status(400).end()
  }
})

module.exports = usersRouter