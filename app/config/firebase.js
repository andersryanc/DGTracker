import firebase from 'react-native-firebase'

export default firebase

export const facebookProvider = firebase.auth.FacebookAuthProvider

export const requestsRef = firebase.database().ref('requests')
export const usersRef = firebase.database().ref('users')

export const requestsCollection = firebase.firestore().collection('requests')
export const usersCollection = firebase.firestore().collection('users')

export const storageRef = firebase.storage().ref()
