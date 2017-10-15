import { StackNavigator } from 'react-navigation'
import { Courses, Course } from '../screens'

export const HOME_ROUTE = 'Courses'

export const RootNavigator = StackNavigator(
  {
    Courses: { screen: Courses },
    Course: { screen: Course },
  },
  {
    headerMode: 'none'
  }
)
