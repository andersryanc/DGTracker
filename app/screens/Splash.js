import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { FLAT_COLORS } from '../config'

export default class Splash extends Component {
  componentWillMount() {
    // this.props.navigation.navigate('MapScreen')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>DGTracker</Text>
      </View>
    )
  }
}

Splash.propTypes = {
  navigation: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FLAT_COLORS.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
})
