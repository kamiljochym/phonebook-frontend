import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './phonenumbers.css'
import './App.scss';
import axios from 'axios'
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'

import Filter from './components/Filter';
import Persons from './components/Persons'
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

function App() {

  const persons = useRef([])
  const [ personsToDisplay, setPersonsToDisplay ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ editingId, setEditingId ] = useState(null)
  const [ editingNumber, setEditingNumber ] = useState(null)

  const [ showAlert, setShowAlert ] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersonsToDisplay(response.data)
      })
  }, [])

  //grabs up to date info from database
  useEffect(() => {
      axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        persons.current = response.data
      })
  })

  const addName = (event) => {
    event.preventDefault()
    console.log(newNumber);
    const nameObject = 
      { id: String(Date.now()),
        name: newName,
        number: formatPhoneNumberIntl(newNumber),
        inEdit: false }

    console.log(nameObject);

    if (newName.length === 0 || !newNumber) {
      setShowAlert(true)
      setAlertMessage('Please enter a Name and Number')
      document.getElementById("namebox").style.border = "solid 1px red";
      document.getElementById("numberbox").style.border = "solid 1px red";
      return
    }
    //reset borders
    document.getElementById("namebox").style.border = "none";
    document.getElementById("numberbox").style.border = "none";

    if (!isValidPhoneNumber(newNumber)) {
      window.alert('Phone number must be valid!')
      document.getElementById("numberbox").style.border = "solid 1px red";
      setShowAlert(true)
      return
    }

    //Adding new name to phonebook
    axios.post('http://localhost:3001/api/persons', nameObject)
    .then(response => {
      console.log(response)
      setPersonsToDisplay(persons.current.concat(nameObject))

    })
    .catch((error) => {
      console.log(error)
    })
  }

  const editName = (personToEdit) => {
    if (editingId !== null) {
      personsToDisplay.find(person => person.id === editingId).inEdit = false
      setEditingId(personToEdit.id)
    }
    personToEdit.inEdit = true
    setEditingId(personToEdit.id)
    setEditingNumber(personToEdit.number)
  }

  const finishEdit = (personToEdit) => {

    personToEdit.inEdit = false

    if (!isValidPhoneNumber(editingNumber)) {
      window.alert('Phone number must be valid')
      setEditingId(null) 
      return
    }

    const updatedPerson = {
      id: personToEdit.id,
      name: personToEdit.name,
      number: editingNumber
    }
    axios
      .put(`http://localhost:3001/api/persons/${personToEdit.id}`, updatedPerson)
      .then(response => {
        const newPersonList = persons.current.map(person => person.id === updatedPerson.id ? updatedPerson : person)
        setPersonsToDisplay(newPersonList)
      })
      .catch(error => {
        console.log(error);
      })
    setEditingId(null) //forces the textbox to update
  }


  const deleteName = (personToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      console.log(personToDelete);
      axios.delete(`http://localhost:3001/api/persons/${personToDelete.id}`)
        .then(response => {
          const newPersonList = persons.current.filter(person => person.id !== personToDelete.id)
          setPersonsToDisplay(newPersonList)
        })
        .catch(error => {
          console.log('error in deletion');
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleEdit = (event) => {
    setEditingNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    const searchName = event.target.value.toLowerCase();

    if (searchName === '') { 
      setPersonsToDisplay(persons.current)
      return;
    }
    const filteredPersons = persons.current.filter(person => person.name.toLowerCase().includes(searchName))
    setPersonsToDisplay(filteredPersons)
  }

  const handlAlertOff = () => {
    setShowAlert(false)
  }

  return (
    <div className="container">
      <h2>Online Phonebook</h2>

      <PersonForm newName={newName} newNumber={newNumber}
                  handleNewName={handleNewName} handleNewNumber={setNewNumber}
                    addName={addName} />

     
      <Filter handleNewSearch={handleNewSearch} />
      
      {showAlert
        ? <Notification setShowAlert={setShowAlert} alertMessage={alertMessage}/>
        : <></>}

      <Persons persons={personsToDisplay} 
               deleteName={deleteName} editName={editName} 
               finishEdit={finishEdit} handleEdit={handleEdit}/>
      
    </div>
  );
}

export default App;
