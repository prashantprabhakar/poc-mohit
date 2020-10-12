import React,  { useState } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import handleRequest from './../../services/http.service'

const Login = (props) => {

  let [creds, setCreds] =  useState({email: '', password: ''})
  let [message, setMessage] = useState({ text: '', type: ''})

  if(props.user) return <Redirect to='/' />

  async function handleSubmit(e) {
    e.preventDefault()
    let url = '/login'
    let resp = await handleRequest('POST', url, creds)
    if(!resp.success) {
      setMessage({ text: resp.message, type: 'Error'})
    }
    // dispatch an action to update user in redux store
    localStorage.setItem('token', resp.data.token )
    localStorage.setItem('user', JSON.stringify(resp.data.user))
    props.setUser(resp.data.user)
    console.log(props.user)

    // redirect to dashboard
  }

  function handleChange(e) {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const getMessageClass = () => {
    let defaultClass = 'center'
    if(message.type === 'Error') {
      return defaultClass + ' red-text'
    } else {
      return defaultClass + 'green-text'
    }
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grye-text"> SignIn </h5> 
          <div className="input-filed">
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" name="email" value={creds.email} onChange={handleChange} />
          </div>
          <div className="input-filed">
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" name="password" value={creds.password} onChange={handleChange} />
          </div>
          <div className="input-filed">
            <button className="btn pink lighten-1 z-depth-0"> Login </button>
          </div>
          <div className={{getMessageClass}}> 
            { message ? <p>{message.text}</p> : null } 
          </div>
        </form>
        
      </div>
  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({type: 'SET_USER', user})
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)