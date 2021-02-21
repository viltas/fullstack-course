const helper = require('../utils/user_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when creating a new user', () => {


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'esimerkki',
      name: 'Esi Merkkinen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a username if it is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kaksoset',
      name: 'Esi Merkkinen',
      password: 'salainen',
    }

    const anotherUser = {
      username: 'kaksoset',
      name: 'Esa Merkkinen',
      password: 'salaisempi',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
    await api
      .post('/api/users')
      .send(anotherUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation will not succeed when the username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ee',
      name: 'Lyhyt Niminen',
      password: 'qwertyuiop',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation will not succeed when the password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Esimerkki666',
      name: 'Elmeri Esimerkki',
      password: 'aa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation will not succeed when the username is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Lyhyt Niminen',
      password: 'qwertyuiop',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation will not succeed when the password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Esimerkki666',
      name: 'Elmeri Esimerkki',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})