import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Todos from './../todos/Todos';
import BarCharts from '../stats/MonthlyStats'
import NotificationBar from '../common/Notification'
import Profile from './../profile'


const Dashbaord = (props) => {

  if(!props.user) return <Redirect to='/login' />
  return (
    <div className="dashboard container">
      {
        props.selectedSubMenu == 'Profile' ? <Profile />: <BarCharts />
      }
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    selectedSubMenu : state.stats.selectedSubMenu
  }
}


export default connect(mapStateToProps)(Dashbaord)