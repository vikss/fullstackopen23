import { useState, useEffect } from 'react'
import phoneService from './services/phone'
import './index.css'

const App = () => {
  const DEFAULT_CLASS = "default"
  const DEFAULT_MESSAGE = { name: "", classname: DEFAULT_CLASS }
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    phoneService.getAll().then(res => setPersons(res))


  }, [])



  const addEntry = (event) => {
    event.preventDefault()

    let found = persons.find(person => person.name === newName)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        let newEntry = { ...found, number: newNumber }
        phoneService.editEntry(found.id, newEntry).then(res =>
          console.log(res))
        let modifiedArray = persons.map(p => {
          if (p.id === found.id) {

            p = newEntry
          }

          return p

        })

        setPersons(modifiedArray)
        setMessage({ name: `User info of ${found.name} edited`, classname: "info" })
        setTimeout(() => { setMessage(DEFAULT_MESSAGE) }, 5000)

      }
      else {

        console.log("User cancelled the edit operation, doing nothing.")
      }

    }
    else {
      let newObj = { name: newName, number: newNumber }
      let obj = persons.concat(newObj)
      phoneService.addEntry(newObj).then(res => console.log(res))
      setPersons(obj)
      setMessage({ name: `Added ${newObj.name}`, classname: "info" })
      setTimeout(() => { setMessage(DEFAULT_MESSAGE) }, 5000)

    }
    setNewName('')
    setNewNumber('')

  }
  const deleteEntry = (event) => {
    event.preventDefault()
    let name = event.target.value
    if (window.confirm(`Delete ${name}?`)) {
      console.log("Inside the delete entry handler")
      console.log(`Deleting the person's entry with name ${name}`)
      let person = persons.find(p => p.name === name)
      let updatedPersons = persons.filter(p => p.name !== name)

      phoneService.deleteEntry(person.id).then(res => {
        if (res.status === 200) {
          console.log(res)
          console.log("Deleted the entry")
          setPersons(updatedPersons)

        }
        else if (res.status === 404) {

          console.log("Deletion operation failed")
          setMessage({ name: `Information of ${name} has already been removed from the server`, classname: "error" })
          setTimeout(() => { setMessage(DEFAULT_MESSAGE) }, 5000)

        }
        else {

          console.log("Something went wrong")
        }


      })
    }
    else {
      console.log("Not deleting the entry")

    }



  }
  const addName = (event) => {

    console.log(event.target.value)
    setNewName(event.target.value)

  }
  const addNumber = (event) => {

    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const filterResult = (event) => {

    console.log(event.target.value)
    setSearchTerm(event.target.value)


  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.name} classname={message.classname}></Notification>
      <div>filter shown with <input value={searchTerm} onChange={filterResult}></input></div>
      <h2>add a new</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={addName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={addNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person => <div>{person.name} {person.number} <button onClick={deleteEntry} value={person.name}>delete</button></div>)}</div>
    </div>
  )
}

const Notification = ({ message, classname }) => {

  if (message == null)
    return null
  else if (classname == "info" || classname == "error")
    return <div className={classname}>{message}</div>

}

export default App