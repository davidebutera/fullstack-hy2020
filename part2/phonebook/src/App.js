/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
    
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
      }

      axios
      .post('http://localhost:3001/persons', noteObject)
      .then(response => {
        setPersons(persons.concat(noteObject))
        setNewName("")
      setNewNumber("")
      })
      
      
    }
    
  }

  // eslint-disable-next-line no-shadow
  const contactsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )

  const searchName = (event) => {
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter {...{ search, searchName, addName }} />
      <h2>add a new</h2>

      <PersonForm
        {...{
          newName,
          handleNameChange,
          newNumber,
          handleNumberChange,
          addName,
        }}
      />
      <Persons {...{ contactsToShow }} />
    </div>
  )
}

export default App
