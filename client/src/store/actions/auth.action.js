import handleRequest from '../../services/http.service'

export const signupAction = (newUser) => {
  console.log(newUser)
  return async(dispatch) => {
    let url = '/signup'
    let resp = await handleRequest('POST', url, newUser)
    console.log(resp)
    try {
      if (resp.success) {
        dispatch({ type: 'SIGNUP_ERROR', error: resp.error})
      }
      dispatch({ type: 'SIGNUP_SUCCESS', user: resp.data.user })
    } catch(e) {
      dispatch({ type: 'SIGNUP_ERROR', error:e})
      //let resp = handleRequest('GET', url)
    }

  }
}

