import handleRequest from '../../services/http.service'

export const signupAction = (newUser) => {
  console.log(newUser)
  return async(dispatch) => {
    try {
      let url = '/signup'
      let resp = await handleRequest('POST', url, newUser)
      if(!resp || !resp.success) dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: resp.error || 'Error in signup'}})
      else  {
        dispatch({type: 'SHOW_NOTFICATION', notification: {isError: false, msg: 'Signup successful'}})
        // @todo: redirect to login here
      }
     
    } catch(error) {
      dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: error.message || 'Error in signup'}})
    }

  }
}

export const loginAction = (creds) => {
  return async(dispatch) => {
    try {
      let url = '/login'
      let resp = await handleRequest('POST', url, creds)
      if(!resp || !resp.success) {
        dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: resp.error || 'Error in login'}})
      }
      dispatch({type: 'SHOW_NOTFICATION', notification: {isError: false, msg: 'Login successful'}})
      // dispatch an action to update user in redux store
      localStorage.setItem('token', resp.data.token )
      localStorage.setItem('user', JSON.stringify(resp.data.user))
      dispatch({type: 'SET_USER', user: resp.data.user})
    } catch(error) {
      dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: error.message || 'Error in signup'}})
    }

  }
}

