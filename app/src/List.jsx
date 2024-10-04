import React from 'react'
import Item from './Item'
const List = ({contacts,onEdit,onDelete}) => {
  return (
    <div style={styles.container}>
       <table style={styles.table}>
        <thead>
            <tr style={styles.headRow}>
                <th style={styles.headerCell}>Name</th>
                <th style={styles.headerCell}>Mobile</th>
                <th style={styles.headerCell}>Address</th>
                <th style={styles.headerCell}>Actions</th>
                <th style={styles.headerCell}>Share</th>
            </tr>
        </thead>
        <tbody>
            {contacts.length === 0 ? (
                <tr>
                    <td>No Contacts Available</td>
                </tr>
            ): (
                contacts.map((contact) => (
                    <Item
                      key={contact.id}
                      contact={contact}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                ))
            )}
        </tbody>
       </table>
    </div>
  )
}

const styles={
    container:{
     backgroundColor:'white',
     padding:'20px',
     borderRadius:'10px',
     boxShadow:'0 0 10px rgba(0,0,0,0.1)',
     margin:'20px 0',
     overflow:'hidden'
    },
    table:{
        width:'100%',
        borderCollapse:'collapse'
    },
    headRow:{
        backgroundColor:'#003366',
        color:'#fff'
    },
    headerCell:{
        padding:'16px',
        textAlign:'left',
        borderBottom:'2px solid #003366',
        fontSize:'18px'
        
    },
    emptyMessage:{
        textAlign:'center',
        color:'#003366',
        fontSize:'20px'
    }
}

export default List
