import React from 'react'

const SearchTodo = (props)=> {

  return (
    <span>
      <input type="text" placeholder="Search Todo ...." onKeyUp={handleSearh}/>
    </span>
    
  )

  function handleSearh(e) {
    props.filter(e.target.value)
  }

}

export default SearchTodo