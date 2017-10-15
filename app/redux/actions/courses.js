import { coursesCollection } from '../../config/firebase'
import { LOADED, UPDATE } from '../reducers/courses'

export const loaded = () => ({
  type: LOADED,
})

export const update = courses => ({
  type: UPDATE,
  courses
})

export const subscribe = () => dispatch => {
  console.log('subscribe')

  coursesCollection.onSnapshot(docs => {
    const courses = []

    docs.forEach(doc => {
      let course = doc.data()
      course.id = doc.id
      courses.push(course)
    })

    dispatch(update(courses))
  }, error => console.log('subscribe ERROR:', error))
}

export const addItem = item => dispatch => {
  coursesCollection.add(item)
    .then(doc => {
      console.log({ doc })
    })
    .catch(error => console.log('addItem ERROR:', error))
}
