import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, StatusBar, ScrollView, StyleSheet, View } from 'react-native'
import { TextField, PreferencesHeader } from '../components'

export default class ProfilePrefs extends Component {
  _onBackButtonPress() {
    Keyboard.dismiss()
    this.props.navigation.navigate('DrawerOpen')
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <PreferencesHeader
          title="Profile"
          onBackPress={() => this._onBackButtonPress()} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextField
            label="NAME"
            placeholder="required"
            returnKeyType="next" />
          <TextField
            label="EMAIL"
            placeholder="name@domain.com"
            returnKeyType="next" />
          <TextField
            label="GoFundMe URL"
            placeholder="gofundme.com/"
            returnKeyType="next" />
        </ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

ProfilePrefs.propTypes = {
  navigation: PropTypes.object,
}
