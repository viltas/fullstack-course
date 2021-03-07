import anecdoteService from '../services/anecdotes'

/*

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}


export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const giveVoteTo = (anecdote) => {
  return async dispatch => {
    const voted = await anecdoteService.giveVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}



export default reducer