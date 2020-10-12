import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Todos from './../todos/Todos';
import BarCharts from '../stats/MonthlyStats'

const Dashbaord = (props) => {

  if(!props.user) return <Redirect to='/login' />
  return (
    <div className="dashboard container">
      <BarCharts />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Dashbaord)