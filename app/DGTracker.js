import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { Keyboard } from 'react-native'

import { RootNavigator } from './config/routes'
import store from './redux/store'
import { update as updateKeyboard } from './redux/actions/keyboard'
import { login, logout } from './redux/actions/user'
import firebase from './config/firebase'

class DGTracker extends Component {
  constructor() {
    super()
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    )
  }
}

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // User is signed in.
        const { email, uid } = firebaseUser
        this.props.dispatch(login({ email, uid }))

        // TODO: Write `watchUserdata()` method
        // this.props.dispatch(watchUserdata())
      } else {
        // this.props.dispatch(userLoaded())
        // User is signed out.
        this.props.dispatch(logout())
      }
    })

    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
    this.keyboardDidShowSub.remove()
    this.keyboardDidHideSub.remove()
  }
  keyboardWillShow = () => {
    this.props.dispatch(updateKeyboard({ isVisible: true }))
  }
  keyboardWillHide = () => {
    this.props.dispatch(updateKeyboard({ isVisible: false }))
  }
  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object,
}

const AppWithNavigation = connect(
  state => ({
    nav: state.nav,
  }),
)(App)

export default DGTracker
