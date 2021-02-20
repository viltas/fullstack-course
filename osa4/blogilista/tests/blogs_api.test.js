const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[2])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[3])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[4])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(5)
})

test('blogs have the id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added ', async () => {
  const newBlog = {
    title: 'Ankeriaiden torjunta ilmatyynyaluksissa',
    author: 'Abraham Liemi',
    url: 'https://onkosinunkinilmatyynyaluksesitaynnaankeriaita.com/',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const author = response.body.map(r => r.author)
  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(6)
  expect(author).toContain(
    'Abraham Liemi'
  )
  expect(title).toContain(
    'Ankeriaiden torjunta ilmatyynyaluksissa'
  )
})

test('likes are 0 by default', async () => {
  const newBlog = {
    title: 'apua kissani hohtaa pimeässä',
    author: 'Bruno DH. Struttenstottensnoff',
    url: 'https://kissajuttuja.net/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[response.body.length - 1].likes).toEqual(0)
})

test('bad request error if title not given', async () => {
  const response = await api.get('/api/blogs')

  const newBlog = {
    author: 'elmeri peterson',
    url: 'https://whoneedsatitle.ab.cd.uk/',
  }

  await api
    .delete('0')
    .send(newBlog)
    .expect(400)

  const newResponse = await api.get('/api/blogs')

  expect(response.body).toHaveLength(newResponse.body.length)
})

test('bad request error if url not given', async () => {
  const response = await api.get('/api/blogs')

  const newBlog = {
    title: 'who needs an url',
    author: 'arhippa peltonen',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const newResponse = await api.get('/api/blogs')
  expect(response.body).toHaveLength(newResponse.body.length)
})


test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body.length)

  await api
    .post('/api/blogs/delete/0')

  const newResponse = await api.get('/api/blogs')
  console.log(newResponse.body.length)

  const author = newResponse.body.map(r => r.author)
  const title = newResponse.body.map(r => r.title)

  !expect(author).toContain(
    'Michael Chan'
  )
  !expect(title).toContain(
    'React Patterns'
  )
})



afterAll(() => {
  mongoose.connection.close()
})