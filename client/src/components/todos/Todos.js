import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import  ListTodos from './ListTodos'
import {fetchTodos } from './../../store/actions/todoAction'


const Todos = (props) => {
  let { todos, setTasks, updateStatus } = props

  useEffect(() => {
    async function fetch() {
      let resp  = await fetchTodos()
      if(resp.success) {
        props.setTasks(resp.data)
      }
    }
    fetch()
    
  }, [])


  return (
    <ListTodos todos={todos} setTasks={setTasks} updateStatus={updateStatus} />
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    // markComplete is name of fn that is mapped to props
    updateStatus: (id) => {
      /**
       * we can directly dispatch action to reducer from state and no need to have 
       * a central action. However if action is called from diff components, it is better
       * to use a defined action
       */
      dispatch({ type: 'UPDATE_STATUS', _id: id })
    },

    setTasks: (tasks) => {
      dispatch({ type: 'SET_TASKS', tasks})
    }
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todo.todos }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
