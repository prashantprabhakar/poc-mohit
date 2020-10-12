const initState = {
    selectedSubMenu: 'View Usage'
}

const statsReducer = (state=initState, action) => {

    switch(action.type) {
        case 'UPDATE_SUBMENU':
            return {
                ...state,
                selectedSubMenu: action.payload
            }
        default:
            return state

    } 

}

export default statsReducer