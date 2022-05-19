import React from "react";
import PhoneInput from 'react-phone-number-input'
import plusIcon from '../plus.svg'


const PersonForm = ({newName, newNumber, handleNewName, handleNewNumber, addName}) => {
    
 
  return (
      <form className="personform">
        <div>
          <input id="namebox" placeholder="Enter Name" value={newName} onChange={handleNewName}/>
        </div>
        
          <PhoneInput id="numberbox" defaultCountry="GB" placeholder="Enter Number" value={newNumber} onChange={handleNewNumber} />
          {/* <input placeholder="Enter Number" value={newNumber} onChange={handleNewNumber}/> */}
        
        <div>
          <button onClick={addName}><img src={plusIcon}></img></button>
        </div>
      </form>
    )
}

export default PersonForm;

