import {createSlice} from '@reduxjs/toolkit'

const contactSlice = createSlice({
   name:'contacts',
   initialState:{
       contacts:JSON.parse(localStorage.getItem('contacts')) || [],
   },
   reducers:{
    setContacts:(state,action)=>{
        state.contacts= action.payload;
    },
    addContact:(state,action)=>{
        state.contacts.push(action.payload)
    },
    editContact:(state,action)=>{
        const index=state.contacts.findIndex(contact => contact.id === action.payload.id);
        if(index !== -1){
            state.contacts[index]=action.payload;
        }
    },
    deleteContact:(state,action)=>{
        state.contacts =state.contacts.filter(contact => contact.id !== action.payload)
    }
   }
})

export const {addContact,setContacts,editContact,deleteContact} =contactSlice.actions;
export default contactSlice.reducer