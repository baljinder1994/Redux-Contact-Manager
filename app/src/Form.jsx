import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {addContact,editContact} from './contactSlice'
import {v4 as uuidv4} from 'uuid'

const Form = ({contactToEdit}) => {
    const dispatch=useDispatch()
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[mobileNumber,setMobileNumber]=useState('')

    useEffect(() =>{
        if(contactToEdit){
            setName(contactToEdit.name);
            setMobileNumber(contactToEdit.mobileNumber);
            setAddress(contactToEdit.address);
        }else{
            setName('');
            setMobileNumber('');
            setAddress('');
        }
     
    },[contactToEdit])

    const handleSubmit=(e)=>{
      e.preventDefault();

      if(contactToEdit){
        dispatch(editContact({id:contactToEdit.id, name,mobileNumber,address}))
      }else{

      
      dispatch(addContact({id: uuidv4(), name,mobileNumber,address}))
      }
    }

  return (
    <div style={styles.container}>
         <h2 style={styles.title}>Contact Manager</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Enter Name'
          style={styles.input}
        ></input>
          <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          placeholder='Enter Mobile'
          style={styles.input}
        ></input>
          <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder='Enter Address'
          style={styles.input}
        ></input>
        
      <button style={styles.button} type="submit">
        {contactToEdit ? 'Edit' :'Add'} Contact
      </button>
     
      </form>
    </div>
  )
}

const styles={
    container:{
        backgroundColor:'white',
        padding:'20px',
        borderRadius:'10px',
        boxShadow:'0 0 10px rgba(0,0,0,0.1)',
        width:'400px',
        margin:'20px auto',
    },
    title:{
        color:'#003366',
        textAlign:'center',
        marginBottom:'20px'

    },
    form:{
        display:'flex',
        flexDirection:'column',
    },input:{
        marginBottom:'10px',
        padding:'10px',
        borderRadius:'5px',
        border:'1px solid #ccc',
        fontSize:'16px',
        color:'#333',
        outline:'none'

    },
    button:{
     padding:'10px',
     backgroundColor:'#003366',
     color:'white',
     borderRadius:'5px',
     border:'none',
     cursor:'pointer',
     fontSize:'16px',

    }
}

export default Form
