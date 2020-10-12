//@ts-check
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import todoReducer from './todoReducer'
import statsReducer from './statsReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  stats: statsReducer,
})

export default rootReducer