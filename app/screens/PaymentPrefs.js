import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, StatusBar, StyleSheet, View } from 'react-native'
import { PreferencesHeader } from '../components'
// import { V3_COLORS } from '../config/theme'

export default class PaymentPrefs extends Component {
  _onBackButtonPress() {
    Keyboard.dismiss()
    this.props.navigation.navigate('DrawerOpen')
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <PreferencesHeader
          title="Payments"
          onBackPress={() => this._onBackButtonPress()} />
        <View style={styles.innerContainer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 20,
  },
})

PaymentPrefs.propTypes = {
  navigation: PropTypes.object,
}
