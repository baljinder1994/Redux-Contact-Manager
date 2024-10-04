import React from 'react'

const Search = ({query,setQuery}) => {
  return (
    <div style={styles.container}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter Alphabet For Search'
          style={styles.input}
        ></input>
    </div>
  )
}
const styles={
   container:{
    margin:'20px 0',
    display:'flex',
    justifyContent:'center',

   },
   input:{
    width:'100%',
    maxWidth:'400px',
    padding:'10px 15px',
    border:'2px solid #003366',
    fontSize:'16px',
    color:'#003366',
    backgroundColor:'white',
    boxShadow:'0px 0px 5px rgba(0,0,0,0.1)'
   }
}

export default Search
