
import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {


    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.createNotification(`new anecdote '${content}' saved`, 5)

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

const mapDispatchToProps = { createAnecdote, createNotification }

const connectedAnecdoteForm = connect(null,
    mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm