// import { StatusBar } from 'react-native'
import { HOME_ROUTE, RootNavigator } from '../../config/routes'

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(HOME_ROUTE)
)

const nav = (state = initialState, action) => {
  // if (action.routeName === 'DrawerOpen') {
  //   StatusBar.setHidden(true)
  // } else {
  //   StatusBar.setHidden(false, 'fade')
  // }

  const nextState = RootNavigator.router.getStateForAction(action, state)
  return nextState || state
}

export default nav
