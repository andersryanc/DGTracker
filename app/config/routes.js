import { StackNavigator } from 'react-navigation'
import { Courses, Course, Motion } from '../screens'

export const HOME_ROUTE = 'Courses'

export const RootNavigator = StackNavigator(
  {
    Motion: { screen: Motion },
    Courses: { screen: Courses },
    Course: { screen: Course },
  },
  {
    headerMode: 'none'
  }
)
