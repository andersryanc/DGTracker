import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { TextField, PreferencesHeader } from '../components'

import FormValidatable from '../protocols/FormValidatable'
import validators from '../validation/fieldValidators'
const fieldValidations = validators(['password', 'confirm'])

export default class PasswordPrefs extends FormValidatable {
  constructor(props) {
    super(props, fieldValidations)
  }
  _onBackButtonPress() {
    Keyboard.dismiss()
    this.props.navigation.navigate('DrawerOpen')
  }
  _submit() {
    // TODO: Show loading indicator
    this.setState({ isLoading: true })
    const { password } = this.state.formdata
    if (super.onSubmit()) {
      console.log('password')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <PreferencesHeader title="Password"
          onBackPress={() => this._onBackButtonPress()}
          rightAction={{
            text: 'Save',
            onPress: () => alert('pressed'),
          }} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextField
            label="NEW PASSWORD"
            placeholder="at least 8 characters"
            secureTextEntry={true}
            value={this.state.formdata.password || ''}
            onChangeText={this.didChange('password')}
            errorMessage={this.state.validationErrors.password}
            showError={this.state.showErrors}
            onSubmitEditing={() => { this.confirmInput.focus() }}
            returnKeyType="next" />
          <TextField
            label="CONFIRM PASSWORD"
            placeholder="matches above"
            secureTextEntry={true}
            value={this.state.formdata.confirm || ''}
            onChangeText={this.didChange('confirm')}
            ref={textField => this.confirmInput = textField ? textField.input : undefined}
            onSubmitEditing={this._submit.bind(this)}
            returnKeyType="go" />
        </ScrollView>
      </View>
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

PasswordPrefs.propTypes = {
  navigation: PropTypes.object,
}
