import handleRequest from '../../services/http.service'
import history from "../../components/history";
import { connect } from 'react-redux';

export const signupAction = (newUser) => {
  console.log(newUser)
  return async(dispatch) => {
    try {
      let url = '/signup'
      let resp = await handleRequest('POST', url, newUser)
      if(!resp || !resp.success) dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: resp.error || 'Error in signup'}})
      else  {
        dispatch({type: 'SHOW_NOTFICATION', notification: {isError: false, msg: 'Signup successful'}})
        history.push('/login')
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
      console.log("=========", {resp});
      
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

export const getProfile = () => {
  return async(dispatch) => {
    try {
      let user = localStorage.getItem('user')
      let token = localStorage.getItem('token')
      let config = { headers: {'Authorization': "jwt " + token} }
      if(user) user = JSON.parse(user)
      let url = `/profile?_id=${user._id}`


      let resp = await handleRequest('GET', url, null, config)
      if(!resp || !resp.success) {
        dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: resp.error || 'Error in fetching profile'}})
      }
      dispatch({ type: 'SET_PROFILE', payload: resp.data.user})
    } catch(error) {
      dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: error.message || 'Error in fetching profile'}})
    }
  }
}

export const updateProfile = (updatedProfile) => {
  return async(dispatch) => {
    try {
      let url = '/profile'
      let token = localStorage.getItem('token')
      let config = { headers: {'Authorization': "jwt " + token} }
      let resp = await handleRequest('POST', url, updatedProfile, config)
      if(!resp || !resp.success) {
        dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: resp.error || 'Error in updating profile'}})
      }
      dispatch({ type: 'SET_PROFILE', payload: resp.data.user})
    } catch(error) {
      dispatch({type: 'SHOW_NOTFICATION', notification: {isError: true, msg: error.message || 'Error in updating profile'}})
    }
  }
}

