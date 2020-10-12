//@ts-check
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import todoReducer from './todoReducer'
import statsReducer from './statsReducer'
import notificationReducer from './notificationReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  stats: statsReducer,
  notifications: notificationReducer,

})

export default rootReducer