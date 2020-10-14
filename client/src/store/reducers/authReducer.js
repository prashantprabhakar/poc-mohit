const initState = {
}

const authReducer = (state=initState, action) => {

  switch(action.type) {

    // case 'SIGNUP_SUCCESS':
    //   return { ...state, authErr: null }

    // case 'SIGNUP_ERROR':
    //   return { ...state, authErr: action.error }

    case 'SET_USER':
      console.log(action.user)
      return { ...state, user: action.user}
    
    case 'LOGOUT':
      console.log('logging out ')
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      return { initState }

    case 'SET_PROFILE':
      return {...state, profile: action.payload}

    default:
      return state
  }

}

export default authReducer