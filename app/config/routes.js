import { StackNavigator } from 'react-navigation'
import { Home } from '../screens'

export const RootNavigator = StackNavigator(
  {
    Home: { screen: Home },
  },
  {
    headerMode: 'none'
  }
)
