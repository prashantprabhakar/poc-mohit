import React,  { useState } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginAction } from './../../store/actions/auth.action'


const Login = (props) => {

  let [creds, setCreds] =  useState({email: '', password: ''})

  if(props.user) return <Redirect to='/' />

  async function handleSubmit(e) {
    e.preventDefault()
    props.loginAction(creds)
  }

  function handleChange(e) {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grye-text"> SignIn </h5> 
          <div className="input-filed">
            <label htmlFor="email"> Email/Phone </label>
            <input type="text" id="email" name="email" value={creds.email} onChange={handleChange} />
          </div>
          <div className="input-filed">
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" name="password" value={creds.password} onChange={handleChange} />
          </div>
          <div className="input-filed">
            <button className="btn pink lighten-1 z-depth-0"> Login </button>
          </div>
        </form>
        
      </div>
  )

}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (creds) => dispatch(loginAction(creds))
})

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)