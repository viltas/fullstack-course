import React, { useState, useEffect } from 'react'
import nameService from './services/persons'
import './index.css'


const Notification = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ error }) => {
  if (error === '') {
    return null
  }
  return (
    <div className="error">
      {error}
    </div>
  )
}

const Filter = ({ handleSearch }) => (
  <div>filter shown with <input onChange={handleSearch} /></div>

)
const Person = ({ person }) => (<p>{person.name}{" "}
  {person.number}</p>)


const PersonForm = ({ addName, newName, handleNewName, newNumber, handleNewNumber }) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName}
        onChange={handleNewName} />
    </div>
    <div>
      number: <input value={newNumber}
        onChange={handleNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const handleDelete = (person, persons, setPersons, setMessage) => {
  console.log("klik!")
  const id = person.id
  if (window.confirm(`Delete ${person.name}?`)) {
    return (
      nameService
        .remove(id)
        .then(
          setPersons(persons.filter(person => person.id !== id)),
          setMessage(`${person.name} was deleted successfully`),
          setTimeout(() => {
            setMessage('')
          }, 3000)
        )
    )
  }
}

const Persons = ({ personsToShow, persons, setPersons, setMessage }) => (
  <ul>
    {personsToShow.map(person =>
      <li key={person.name}>
        <Person person={person} /><button onClick={() => handleDelete(person, persons, setPersons, setMessage)}>delete</button>
      </li>
    )}
  </ul>
)


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [Message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const personsToShow = !search
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) === true)

  const handleUpdate = (isFound, newNumber) => {
    const id = isFound[0].id
    const exPerson = persons.find(p => p.id == id)
    nameService
      .update(exPerson.id, { ...exPerson, number: newNumber })
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${updatedPerson.name} was updated successfully`)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(`${isFound[0].name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)

      })
  }

  const addName = (event) => {
    event.preventDefault()
    const isFound = persons.filter(person => person['name'] === newName)
    if (isFound.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("päivitetään!")
        handleUpdate(isFound, newNumber)

      }

    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      nameService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setMessage(`${nameObject.name} was added successfully`)
          setTimeout(() => {
            setMessage('')
          }, 2000)
        })

    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <Notification message={Message} />
      <Error error={errorMessage} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setMessage={setMessage} setErrorMessage={setErrorMessage} />
    </div>
  )

}

export default App