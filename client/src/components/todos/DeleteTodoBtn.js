import React from 'react'
import {connect}  from 'react-redux'
import {deleteTodo} from './../../store/actions/todoAction'

const DeleteTodoBtn =  (props) => {

  const handleDelete = () => {
    console.log(`id of delte btn todo ${props.id}` )
    props.deleteTodo(props.id)
  }

  return (
    <button className="btn-floating btn-large waves-effect waves-light red right" onClick={handleDelete}>
      <i className="small material-icons">delete</i>
    </button>

  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: async(id) => { dispatch(await deleteTodo(id))}
  }
}

export default connect(null, mapDispatchToProps)(DeleteTodoBtn)