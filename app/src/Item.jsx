import React from 'react'
import {FaEdit, FaTrashAlt, FaWhatsapp} from 'react-icons/fa'
const Item = ({contact,onEdit,onDelete}) => {

    const handleShare=()=>{
     const message= `Contact Details:\nName: ${contact.name}\Mobile:${contact.mobileNumber}\nAddress: ${contact.address}`;
     const whatsappUrl=`https://wa.me/?text=${encodeURIComponent(message)}`
     window.open(whatsappUrl,'_blank')
    }
  return (
    <tr>
        <td style={styles.cell}>{contact.name}</td>
        <td style={styles.cell}>{contact.mobileNumber}</td>
        <td style={styles.cell}>{contact.address}</td>
        <td style={styles.cell}>
        <button onClick={() => onEdit(contact)} style={styles.actionButton}><FaEdit/></button>
      
        </td>
        <td style={styles.cell}>
        <button onClick={() => onDelete(contact.id)} style={styles.actionButton}><FaTrashAlt/></button>
  
        </td>
        <td style={styles.cell}>
        <button onClick={handleShare} style={styles.whatsappButton}><FaWhatsapp/></button>
  
        </td>
          </tr>
  )
}

const styles={
  cell:{
    padding:'16px',
    fontSize:'18px',
    borderBottom:'1px solid #ddd'
  },
  actionButton:{
    backgroundColor:'transparent',
    border:'none',
    marginLeft:'10px',
    color:'#003366',
    fontSize:'20px',
  },
  whatsappButton:{
   backgroundColor:'transparent',
   border:'none',
   cursor:'pointer',
   color:'#25d366',
   fontSize:'20px',

  }
}

export default Item
