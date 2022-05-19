import React from "react";
import PersonForm from "./PersonForm";
import deleteIcon from '../trash-2.svg'
import editIcon from '../edit.svg'
import checkIcon from '../check.svg'

const Persons = ({ persons, deleteName, editName, finishEdit, handleEdit }) => {
    return (
        <div className="phonebook">
            {persons.map((person, Idx) => (
                    <div className="phonebook-entry" key={Idx}>
                        <div className="phonebook-entry-details">
                            <div className="phonebook-entry-details-name">{person.name}</div>
                            {person.inEdit 
                                ? <input id={'p'+person.id} type="text" defaultValue={person.number} onChange={handleEdit}/>
                                : <div className="phonebook-entry-details-number">{person.number}</div>  
                            }
                        </div>
                        <div className="phonebook-entry-buttons">
                            {person.inEdit 
                                ?  <button className="phonebook-entry-buttons-finish" onClick={() => finishEdit(person)}> <img src={checkIcon} height={'20px'}></img>  </button>
                                :  <button className="phonebook-entry-buttons-edit" onClick={() => editName(person)}> <img src={editIcon} height={'20px'}></img> </button>
                            }
                            <button className="phonebook-entry-buttons-delete" onClick={() => deleteName(person)}><img src={deleteIcon} height={'20px'}></img> </button>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default Persons;