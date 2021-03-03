
import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(newNotification(content))
        setTimeout(function(){ dispatch(hideNotification()) }, 5000);

    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm