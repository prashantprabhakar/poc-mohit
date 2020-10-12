import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signupAction } from './../../store/actions/auth.action'
import handleRequest from './../../services/http.service'


/**
 * This component will use state
 */
const Signup = (props) => {

  let [state, setState] =  useState({
    name: '',
    email:  '',
    password: ''
  })

  let [err, setErr] = useState('')
  let [successMsg, setSuccessMsg] = useState('')

  // Redirect to "/"" if logged in
  if(props.user) return <Redirect to='/' />

  function handleChange(e) {
    setState({ ...state,  [e.target.name] : e.target.value })
  }

  async function handleSumbit() {
    let url = '/signup'
    let resp = await handleRequest('POST', url, state)
    console.log(resp)
    if(resp.success) {
      setSuccessMsg(resp.message)
    } else {
      setErr(resp.err)
    }
  }


  return (
    <div className="container">
      <form className="white">
        <h5 className="grye-text"> SignUp </h5>
        <div className="input-field">
          <label htmlFor="name"> Name </label>
          <input type="text" id="name" name='name' value={state.name} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="email"> Email </label>
          <input type="email" id="email" name='email' value={state.email} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" name='password' value={state.password} onChange={handleChange} />
        </div>
        <div className="input-field">
          <button type="button" className="btn pink lighten-1 z-depth-0" onClick={handleSumbit}> Signup </button>
        </div>
        <div className="red-text center">
          {err ? <p>{err}</p> : null}
        </div>
        <div className="green-text center">
          {successMsg ? <p>{successMsg}</p> : null}
        </div>
      </form>
    </div>
  )
}

const mapStateToProps =  (state) => {
  return { 
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignup: (newUser) => {
      dispatch(signupAction(newUser))
    }
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Signup)
