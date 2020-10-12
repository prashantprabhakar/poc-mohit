import  handleRequest  from "./../../services/http.service";

export const markCompleteAction = (id) => {
    return async(dispatch) => {
        dispatch({ type:  'MARK_COMPLETE', id })
    }
}

export const markCompleteAction2 = (dispatch, id) => {
    return dispatch({ type:  'MARK_COMPLETE', id })
}

export const updateStatus = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type:  'UPDATE_STATUS', id })
    }
}

export const addTodo = async(title) => { 

    let token = localStorage.getItem('token')
    var config = { headers: {'Authorization': "jwt " + token} }
    let todo = { title, status: 'Pending', priority: 'Medium' }
    let url = '/todo/add-todo'
    try {
        let resp = await handleRequest('POST',url, {todo}, config)
        console.log(resp)
        if (resp.success) {
            return { type: 'ADD_TODO', todo: resp.data }
        } else {
            console.log('Error in adding task',resp.error)
            return {}
        }
    } catch(e) {
        console.log(e)
        return {}
    }
}

export const fetchTodos = async() => {
    let url = '/todo'
    let token = localStorage.getItem('token')
    var config = { headers: {'Authorization': "jwt " + token} }
    let resp = await handleRequest('GET', url, null, config)
    return resp
}


export const deleteTodo = async(id) => {
    let url = '/todo/delete-todo/'+id
    let resp = await handleRequest('POST',url)
    console.log({resp})
    return {type: 'DELETE_TODO', id}
}