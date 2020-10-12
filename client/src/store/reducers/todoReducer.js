const initState = {
    todos: [
        // { id: 1, title: 'Buy Milk', status: 'Pending', priority: 'High'},
        // { id: 2, title: 'See doc', status: 'Pending', priority: 'Urgent'},
        // { id: 3, title: 'Learn React', status: 'Completed', priority: 'Medium'}
    ]
}

const todoReducer = (state = initState, action) => {
    //console.log('reducer called')
    switch(action.type) {
        // case 'ADD_TODO': return state.merge(action.state);
        case 'MARK_COMPLETE':
            
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id ===  action._id) return { ...todo, status: 'Completed'}
                    return todo
                })
            }
            
        
        case 'UPDATE_STATUS':
            return {
                ...state,
                todos : state.todos.map(todo => {
                    if(todo._id ===  action._id) {
                        let newStatus = (todo.status === 'Pending') ? 'Completed' : 'Pending'
                        return { ...todo, status: newStatus}
                    }
                    return todo
                })
            }

        case 'ADD_TODO':
            //let newTodo = {id:state.todos.length+1, title: action.todo, status: 'Pending', priority: 'Medium'}
            return { 
                ...state,
                todos: [...state.todos, action.todo]
            }

        case 'SET_TASKS':
            return {
                ...state,
                todos: action.tasks
            }
        
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.id)
            }

        default:
        return state;
    }
}



export default todoReducer