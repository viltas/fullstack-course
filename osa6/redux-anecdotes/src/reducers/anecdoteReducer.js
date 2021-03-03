

const getId = () => (100000 * Math.random()).toFixed(0)

/*
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
      var voted = state.find(a => a.id === action.data.id)
      voted.votes++
      const newState = state.map(anecdote => anecdote.id !== voted.id ? anecdote : voted)
      return newState
    case 'NEW_ANECDOTE':
      return [...state, action.data]
      case 'INIT_NOTES':
        return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_NOTES',
    data: anecdotes,
  }
}


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0
    }
  }
}

export const giveVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer