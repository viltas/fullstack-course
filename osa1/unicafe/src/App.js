import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

)


const Statistics = ({ good, neutral, bad }) => {

  const average = (good * 1 + bad * -1) / (good + neutral + bad)
  const positive = (good / ((good + neutral + bad)) * 100).toFixed(1) + " %"

  if ((good + neutral + bad) === 0) {
    return (
      <tbody><tr><td>No feedback given</td></tr></tbody>
    )
  }
  return (
    <tbody>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={good + neutral + bad} />
      <StatisticLine text={"average"} value={average} />
      <StatisticLine text={"positive"} value={positive} />
    </tbody>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give Feedback </h1>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1> Statistics </h1>

      <table>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>
    </div>
  )
}

export default App