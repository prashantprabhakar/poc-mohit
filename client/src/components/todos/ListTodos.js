import React, { useEffect, useState } from 'react'

import AddTodo from './AddTodo'
import DeleteTodoBtn from './DeleteTodoBtn' 
import SearchTodo  from './searchTodo'

const ListTodos = (props) => {
  let {todos,  updateStatus } = props
  console.log("ppp", todos)
  let [myTodos, setMyTodos] = useState(todos)

  useEffect(() => {
    console.log("aaa")
    setMyTodos(todos)
    
  },[todos])
  
  const updateTodos = (searchText) => {
    let filteredTodos = todos.filter(myTodo => myTodo.title.toLowerCase().includes(searchText.toLowerCase()))
    setMyTodos(filteredTodos)
  }

  if(!myTodos || !myTodos.length) {
    return (
      <div className="container section project-details">
        <SearchTodo filter={updateTodos}/>
        <AddTodo />
      </div>
    )
  } else{
    return (
      <div className="container section project-details">
        <SearchTodo filter={updateTodos}/>
        {myTodos.map(todo => {
          return (
            <div className="card z-depth-0" key={todo._id}>
              <div className="card-content" style={getTodoStyle(todo.status)} >
                <span className="card-title" onClick={() => updateStatus(todo._id)}>
                  <b> {todo.title} </b> 
                  <DeleteTodoBtn  id={todo._id}/>
                </span>
                
              </div>
              
            </div>
          )

        })}
        <AddTodo />
      </div>
    )
  }


}

/**
 * formats todo text as per their status 
 */
const getTodoStyle = (status) => {
  if (status === 'Completed') {
    return {
      textDecoration: 'line-through',
      cursor: 'pointer'
    }
  }
  else return { color: 'red',cursor: 'pointer' }
}




/**
 * this function gets state from store then we can return an object that represents prop
 */
// const mapStateToProps = (state) => {
//   return { todos: state.todo.todos }
// }

/**
 * METHOD 1: DISPATCH ACTION DIRECTLY FROM COMONENT
 * matchDispatchToProps returns an object with a function whhich is mapped to props
 * the function could be moved to a new file (actions) for reuse 
 * map a dispatch fn to props
 * returns a fn that is mapped to props
 */

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // markComplete is name of fn that is mapped to props
//     updateStatus: (id) => {
//       /**
//        * we can directly dispatch action to reducer from state and no need to have 
//        * a central action. However if action is called from diff components, it is better
//        * to use a defined action
//        */
//       dispatch({ type: 'UPDATE_STATUS', _id: id })
//     },

//     setTasks: (tasks) => {
//       dispatch({ type: 'SET_TASKS', tasks})
//     }
//   }
// }

/**
 * METHOD 2: MOVE DISPATCH TO ANOTHER FILE FOR REUSE 
 */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     markComplete: (id) => markCompleteAction2(dispatch, id)
//   }
// }

/**
 * METHOD 3: USE A FUNCTION INSTEAD OF OBJECT ( used for asycn actions )
 * we can not pass function directly to dispatch, it takes only object. 
 * We have to use "thunk" middleware while creating store if we want to use fns like an async task
 * 
 */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateStatus: (id) => dispatch(updateStatus(id))
//   }
// }


// export default compose(connect(mapStateToProps))(ListTodos)

export default ListTodos
