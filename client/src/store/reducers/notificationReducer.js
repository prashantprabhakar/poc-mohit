const initState = {
    notification: {
        isError: false,
        msg: ''
    }
}

const notificationReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SHOW_NOTFICATION':
            
            return {
                ...state,
            notification: action.notification
            }
            
        
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                notification: initState
            }

        default:
        return state;
    }
}



export default notificationReducer