import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Platform, StyleSheet, View } from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: null,
      showSignup: false,
    }
  }
  componentWillMount() {
    this.props.subscribe()
  }
  _onCreateRequest() {
  }
  _onHideSignup() {
    this.setState({ showSignup: false })
  }
  _updateUserLocation(position) {
    this.setState({ position })
  }
  _onNeedRequestAcceptance() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 20,
    backgroundColor: 'white',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
  },
})

Home.propTypes = {
  initPendingRequest: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  subscribe: PropTypes.func.isRequired,
  updatePendingRequest: PropTypes.func.isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    keyboardIsVisible: state.keyboard.isVisible,
    user: state.user.data,
    userIsLoggedIn: (state.user.isLoaded && state.user.isAuthenticated),
  }),
  dispatch => ({
    initPendingRequest: () => dispatch(init()),
    subscribe: () => dispatch(subscribe()),
    updatePendingRequest: (request) => dispatch(update(request)),
  })
)(Home)
