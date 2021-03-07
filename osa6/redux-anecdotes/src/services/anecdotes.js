import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const giveVote = async (anecdote) => {
  const object = { ...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(baseUrl.concat(`/${anecdote.id}`), object)
  console.log('response.data', response.data)
  return response.data
}

const obj = { getAll, createNew, giveVote }

export default obj