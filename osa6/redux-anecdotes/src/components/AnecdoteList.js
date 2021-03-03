
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { giveVoteTo } from '../reducers/anecdoteReducer'
import { voteNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)

    const giveVote = (anecdote) => {
        dispatch(giveVoteTo(anecdote.id))
        dispatch(voteNotification(anecdote.content))
        setTimeout(function(){ dispatch(hideNotification()) }, 5000);
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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