import firebase, { usersCollection } from '../../config/firebase'
import { LOADED, LOGIN, LOGOUT, CREATE_FAILED, UPDATE } from '../reducers/user'

export const loaded = () => ({
  type: LOADED,
})

export const login = user => ({
  type: LOGIN,
  user,
})

export const logout = () => ({
  type: LOGOUT,
})

export const signOut = () => {
  return () => {
    firebase.auth().signOut()
      .catch(error => console.log(error))
  }
}

export const createFailed = error => ({
  type: CREATE_FAILED,
  error
})

export const update = user => ({
  type: UPDATE,
  user
})

export const loadUserdata = () => dispatch => {
  const { uid } = firebase.auth().currentUser
  usersCollection.doc(uid).get()
    .then(doc => dispatch(update(doc.data())))
    .catch(error => console.log('loadUserdata ERROR:', error))
}

export const saveUserdata = data => dispatch => {
  const { uid } = firebase.auth().currentUser
  usersCollection.doc(uid).get()
    .then(doc => doc.exists ? doc.ref.update(data) : doc.ref.set(data))
    .then(() => dispatch(update(data)))
    .catch(error => console.log('saveUserdata ERROR:', error))
}
