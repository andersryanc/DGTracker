import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

class Home extends Component {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Home.propTypes = {
}

export default connect(
  state => ({
  }),
  dispatch => ({
  })
)(Home)
