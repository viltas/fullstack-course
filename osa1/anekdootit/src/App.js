import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  const [selected, setSelected] = useState(0)

  const setRandomToSelected = () => {
    const random = Math.floor(Math.random() * (anecdotes.length))
    if (random !== selected) {
      setSelected(random)
    } else {
      setRandomToSelected()
    }

  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const Popular = () => {
    if (Math.max.apply(Math, votes) === 0) {
      return ("No votes")
    }
    const index = votes.indexOf(Math.max.apply(Math, votes))
    return (
      anecdotes[index]
    )
  }

  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={handleVote} text={"vote"} />
      <Button handleClick={() => setRandomToSelected()} text={"next anecdote"} />

      <h1>Anecdote with most votes</h1>
      <Popular />
    </div>
  )
}

export default App