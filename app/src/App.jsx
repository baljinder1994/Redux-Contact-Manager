import React, { useEffect, useState } from 'react'
import Form from './Form'
import List from './List'
import { useDispatch,useSelector } from 'react-redux'
import { setContacts ,deleteContact, addContact} from './contactSlice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileCsv} from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
const App = () => {

  const dispatch = useDispatch()
  const contacts= useSelector((state) => state.contacts.contacts)
  const[editingContact,setEditingContact]=useState(null)
  const[undoTimeout,setUndoTimeout]=useState(null)
  const[recentDelete,setRecentDelete]=useState(null)
  const[query,setQuery]=useState('')


  useEffect(() =>{
    const savedContacts=JSON.parse(localStorage.getItem('contacts')) || [];
    dispatch(setContacts(savedContacts))
  },[dispatch])

  useEffect(() =>{
    localStorage.setItem('contacts',JSON.stringify(contacts))
  },[contacts])

const handleDelete=(id) =>{
 const contactToDelete= contacts.find(contact => contact.id === id);
 if(contactToDelete){
  setRecentDelete(contactToDelete)
  dispatch(deleteContact(id));

  const timeout=setTimeout(() =>{
    setRecentDelete(null)
  },5000)
  setUndoTimeout(timeout)
 }
}
const exportContact=() =>{
   const csvRows=[
    ["Name","Mobile","Address"],
    ...contacts.map(contact =>[
      contact.name,
      contact.mobileNumber,
      contact.address
    ])
   ]

   const csvContent=csvRows.map(row => row.join(",")).join("\n");
   const blob=new Blob([csvContent], { type:'text/csv'});
   const url=URL.createObjectURL(blob);
   const a=document.createElement('a')
   a.href=url;
   a.download='contacts.csv'
   a.click();
   URL.removokeObjectURL(url);
}
const handleUndo=()=>{
  if(recentDelete){
    dispatch(addContact(recentDelete));
    setRecentDelete(null);
    clearTimeout(undoTimeout)
  }
}

const filterContact=contacts
  .filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase()) || 
    contact.mobileNumber.toLowerCase().includes(query) ||
    contact.address.toLowerCase().includes(query.toLowerCase())
  )
  .sort((a,b) => a.name.localeCompare(b.name))
  return (
    <div style={styles.container}>
      <h1>Contact Manager</h1>
      <Search query={query} setQuery={setQuery}/>
      <Form contactToEdit={editingContact}/>
      <List
      contacts={filterContact}
        setContacts={(newContacts)=> dispatch(setContacts(newContacts))}
        onEdit={setEditingContact}
        onDelete={handleDelete}
      />

      {recentDelete && (
        <div style={styles.undoButton}>
          <p>Contact deleted: <button onClick={handleUndo} >Undo</button></p>
        </div>
      )}

      <button onClick={exportContact} style={styles.exportButton}>
        <FontAwesomeIcon icon={faFileCsv}/>
      </button>
    </div>
  )
}

const styles={
   container:{
    position:'relative',
    padding:'20px'
   },
   exportButton:{
    position:'absolute',
    top:'20px',
    right:'20px',
    color:'white',
    backgroundColor:'#003366',
    padding:'10px 15px',

   },
   undoButton:{
    position:'absolute',
    top:'20px',
    right:'100px',
    color:'white',
    backgroundColor:'#003366',
    padding:'10px 15px',

   }
}
export default App
