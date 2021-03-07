
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { giveVoteTo } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
    const filter = useSelector(state => state.filter)
    console.log(filter)
    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    const giveVote = (anecdote) => {
        dispatch(giveVoteTo(anecdote))
        dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
    }
    console.log(anecdotes)

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div><div>
                        has {anecdote.votes}
                        <button onClick={() => giveVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList