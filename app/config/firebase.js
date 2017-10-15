import firebase from 'react-native-firebase'

export default firebase

export const facebookProvider = firebase.auth.FacebookAuthProvider
export const coursesCollection = firebase.firestore().collection('courses')
export const roundsCollection = firebase.firestore().collection('rounds')
export const usersCollection = firebase.firestore().collection('users')
export const storageRef = firebase.storage().ref()
