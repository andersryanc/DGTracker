import { NavigationActions } from 'react-navigation'

export const navigate = routeName => ({
  type: NavigationActions.NAVIGATE,
  routeName,
})

export const reset = routeName => ({
  type: NavigationActions.RESET,
  index: 0,
  actions: [
    { type: NavigationActions.NAVIGATE, routeName }
  ]
})
