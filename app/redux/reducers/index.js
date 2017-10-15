import { combineReducers } from 'redux'
import courses from './courses'
import keyboard from './keyboard'
import nav from './nav'
import user from './user'

const reducers = combineReducers({
  courses,
  keyboard,
  nav,
  user,
})

export default reducers
