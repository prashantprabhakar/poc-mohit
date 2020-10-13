import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signupAction } from './../../store/actions/auth.action'


/**
 * This component will use state
 */
const Signup = (props) => {

  let [state, setState] =  useState({
    fName: '',
    lName: '',
    phone: '',
    address1: '',
    address2: '',
    aptNo: '',
    city: '',
    state: '',
    zip: '',
    email:  '',
    password: '',
  })

  // Redirect to "/"" if logged in
  if(props.user) return <Redirect to='/' />

  function handleChange(e) {
    setState({ ...state,  [e.target.name] : e.target.value })
  }

  function handleNumericField(e) {
    let val = e.target.value;
    if(val == '') setState({...state, [e.target.name]: val})
    if(!val.length) return
    let lastTyped = val[val.length-1]
    if(![0,1,2,3,4,5,6,7,8,9].includes(+lastTyped)) return
    setState({...state, [e.target.name]: val})
  }

  async function handleSumbit() {
   props.submitSignup(state)
  }


  return (
    <div className="container">
      <form className="white">
        <h5 className="grye-text"> SignUp </h5>
        <div className="input-field">
          <label htmlFor="fname"> First Name </label>
          <input type="text" id="fName" name='fName' value={state.name} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lName"> Last Name </label>
          <input type="text" id="lName" name='lName' value={state.name} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="phone"> Phone </label>
          <input type="text" id="phone" name='phone' value={state.phone} onChange={handleNumericField} />
        </div>
        <div className="input-field">
          <label htmlFor="address1"> Address Line 1 </label>
          <input type="text" id="address1" name='address1' value={state.address1} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="address2"> Address Line 2 </label>
          <input type="text" id="address2" name='address2' value={state.address2} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="aptNo"> Apt No (Optional) </label>
          <input type="text" id="aptNo" name='aptNo' value={state.aptNo} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="city"> City </label>
          <input type="text" id="city" name='city' value={state.city} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="state"> State </label>
          <input type="text" id="state" name='state' value={state.state} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="zip"> Zip </label>
          <input type="text" id="zip" name='zip' value={state.zip} onChange={handleNumericField} />
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
