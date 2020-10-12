import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SubMenu from './SubMenu'

const Navbar = (props) => {

  return (
    <>
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to='/' className='brand-logo'> PoC App </Link>
          {props.user ? signedInLinks(props) : signedOutLinks()}
        
        </div>
      </nav>
      { props.user ? <SubMenu />: '' }
    </>
  )
}

function signedInLinks(props) {
  return (
    <ul className="right">
      <li> <NavLink onClick={ props.logout }  to='/'  > Logout </NavLink> </li>
    </ul>
  )
}

function signedOutLinks() {
  return (
    <ul className="right">
      <li> <NavLink to="/signup"> SignUp </NavLink> </li>
      <li> <NavLink to="/login"> Login </NavLink> </li>
    </ul>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch({ type: 'LOGOUT'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)