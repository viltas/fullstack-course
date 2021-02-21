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

describe('when viewing blogs', () => {

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

})

describe('when saving a new blog', () => {

  test('a blog can be saved ', async () => {
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



  test('fails with statuscode 400 if title not given', async () => {

    const newBlog = {
      author: 'elmeri peterson',
      url: 'https://whoneedsatitle.ab.cd.uk/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('fails with statuscode 400 if url not given', async () => {

    const newBlog = {
      title: 'who needs an url',
      author: 'arhippa peltonen',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

})


describe('when editing blog data', () => {

  test('deleting a blog succeeds with status code 204 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const responseAfterDelete = await api.get('/api/blogs')
    expect(responseAfterDelete.body).toHaveLength(
      response.body.length - 1
    )
    const titles = responseAfterDelete.body.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('an existing blog can be edited', async () => {

    const response = await api.get('/api/blogs')
    const blogToEdit = response.body[0]

    const update = {
      title: blogToEdit.title,
      author: blogToEdit.author,
      url: blogToEdit.url,
      likes: 100,
      id: blogToEdit.id
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(update)

    const newResponse = await api.get('/api/blogs')
    const updatedBlog = newResponse.body[0]
    expect(updatedBlog.likes).toEqual(100)
  })

})

afterAll(() => {
  mongoose.connection.close()
})