import { DrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'
import {
  Home,
  PasswordPrefs,
  PaymentPrefs,
  ProfilePrefs,
  Preferences,
} from '../screens'

const { width } = Dimensions.get('window')

export const RootNavigator = DrawerNavigator(
  {
    Home: { screen: Home },
    ProfilePrefs: { screen: ProfilePrefs },
    PasswordPrefs: { screen: PasswordPrefs },
    PaymentPrefs: { screen: PaymentPrefs },
  },
  {
    contentComponent: Preferences,
    drawerWidth: width * 0.8
  }
)
