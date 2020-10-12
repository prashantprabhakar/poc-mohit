import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signupAction } from './../../store/actions/auth.action'


/**
 * This component will use state
 */
const Signup = (props) => {

  let [state, setState] =  useState({
    name: '',
    email:  '',
    password: '',
    phone: '',
  })

  // Redirect to "/"" if logged in
  if(props.user) return <Redirect to='/' />

  function handleChange(e) {
    setState({ ...state,  [e.target.name] : e.target.value })
  }

  function hanldePhoneChange(e) {
    let val = e.target.value;
    if(val == '') setState({...state, phone: val})
    if(!val.length) return
    let lastTyped = val[val.length-1]
    if(![0,1,2,3,4,5,6,7,8,9].includes(+lastTyped)) return
    setState({...state, phone: val})
  }

  async function handleSumbit() {
   props.submitSignup(state)
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
          <label htmlFor="phone"> Phone </label>
          <input type="text" id="phone" name='phone' value={state.phone} onChange={hanldePhoneChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" name='password' value={state.password} onChange={handleChange} />
        </div>
        <div className="input-field">
          <button type="button" className="btn pink lighten-1 z-depth-0" onClick={handleSumbit}> Signup </button>
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

const mapDispatchToProps = dispatch => ({
  submitSignup: (newUser) => dispatch(signupAction(newUser))
})




export default connect(mapStateToProps,mapDispatchToProps)(Signup)
