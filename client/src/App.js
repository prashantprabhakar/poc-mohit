import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom' 
import './App.css'
import Navbar from './components/layout/Navbar'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import Dashboard from './components/dashboard/Dashbaord'
import ListTodos from './components/todos/ListTodos'
import NotFound from './components/layout/Notfound'

import BarCharts from './components/stats/MonthlyStats'
import  { connect } from 'react-redux'

function App(props) {

  props.setUser()

  return (

    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component= {Dashboard} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/todos' component={ListTodos} />
          <Route path="/chart" component={BarCharts} />
          
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  let user = localStorage.getItem('user')
  //let token = localStorage.getItem('token')
  return {
    setUser : () => dispatch({ type: 'SET_USER', user })
  }
}

export default connect(null, mapDispatchToProps)(App);
