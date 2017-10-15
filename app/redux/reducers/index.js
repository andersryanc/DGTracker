import { combineReducers } from 'redux'
import courses from './courses'
import rounds from './rounds'
import keyboard from './keyboard'
import nav from './nav'
import user from './user'

const reducers = combineReducers({
  courses,
  rounds,
  keyboard,
  nav,
  user,
})

export default reducers
