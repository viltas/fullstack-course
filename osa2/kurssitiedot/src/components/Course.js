import React from 'react'


const Header = ({ course }) => (
  <h2>{course.name}</h2>
)


const Total = ({ parts }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)
  return <p><b>total of {total} exercises</b></p>
}

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = ({ course }) => (
  course.parts.map(part =>
    <li key={part.id}>
      <Part part={part.name} exercises={part.exercises} />
    </li>
  )
)


const Course = ({ courses }) => {
  return (

    courses.map(course =>
      <li key={course.id}>

        <Header course={course} />
        <ul>
          <Content course={course} />
        </ul>
        <Total parts={course.parts} />

      </li>


    )
  )
}

export default Course