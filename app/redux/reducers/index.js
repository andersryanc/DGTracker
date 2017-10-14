import { combineReducers } from 'redux'
import keyboard from './keyboard'
import nav from './nav'
import user from './user'

const reducers = combineReducers({
  keyboard,
  nav,
  user,
})

export default reducers
