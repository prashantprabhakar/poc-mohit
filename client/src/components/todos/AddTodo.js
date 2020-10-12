import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './../../store/actions/todoAction'

export const CreateToDo = (props) => {

  let [todo, setTodo] = useState('')

  const handleChange =  (e) => {
    setTodo(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      props.addTodo1(todo)
      setTodo('')
    }
  }

  return (
    <div className="card z-depth-0">
      <div className="card-content" >
        <span className="card-title">
          <input value={todo} onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Add a new todo..." ></input>
        </span>
      </div>
    </div>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo : (e) => { dispatch({type: 'ADD_TODO', todo: e.target.value })}
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo1 : async todo => { dispatch(await addTodo(todo)) }
  }
}

export default connect(null, mapDispatchToProps)(CreateToDo)