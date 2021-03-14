import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders nothing but title and author', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Testersson',
    url: 'test.com',
    likes: 6,
    user: {
      name: 'Tutankhamon',
      username: 'tutankh4mon666'
    }
  }

  const user = {
    name: 'testi testinen',
    username: 'testikayttaja'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Test Title'
  )
  expect(component.container).toHaveTextContent(
    'Test Testersson'
  )
  expect(component.container).not.toHaveTextContent(
    'test.com'
  )
  expect(component.container).not.toHaveTextContent(
    '6'
  )
})


test('renders url and likes after view button in pressed but title and author', () => {

  const blog = {
    title: 'Test Title',
    author: 'Test Testersson',
    url: 'test.com',
    likes: 6,
    user: {
      name: 'Tutankhamon',
      username: 'tutankh4mon666'
    }
  }

  const user = {
    name: 'testi testinen',
    username: 'testikayttaja'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'test.com'
  )
  expect(component.container).toHaveTextContent(
    '6'
  )
})

test('event handler is called twice if a blog is liked twice', () => {

  const blog = {
    title: 'Test Title',
    author: 'Test Testersson',
    url: 'test.com',
    likes: 6,
    user: {
      name: 'Tutankhamon',
      username: 'tutankh4mon666'
    }
  }

  const user = {
    name: 'testi testinen',
    username: 'testikayttaja'
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likeBlog={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


})