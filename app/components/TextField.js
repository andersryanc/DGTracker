import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../config'

export default class TextField extends Component {
  render() {
    const { errorMessage, label, showError } = this.props
    const inputProps = {
      onChangeText: this.props.onChangeText,
      onSubmitEditing: this.props.onSubmitEditing,
      placeholder: this.props.placeholder,
      returnKeyType: this.props.returnKeyType,
      secureTextEntry: this.props.secureTextEntry,
      value: this.props.value,
    }

    const labelText = (errorMessage && showError)
      ? errorMessage
      : (label || '').toUpperCase()

    const labelStyles = [styles.label]
    const borderStyles = [styles.borderBottom]
    if (errorMessage && showError) {
      labelStyles.push(styles.labelError)
      borderStyles.push(styles.borderError)
    }

    return (
      <View style={styles.container}>
        <Text style={labelStyles}>{labelText}</Text>
        <TextInput style={styles.input} {...inputProps}
          ref={input => this.input = input}
          underlineColorAndroid="transparent" />
        <View style={borderStyles} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
  },
  labelError: {
    color: COLORS.darkRed,
  },
  input: {
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 24,
    fontWeight: '900',
  },
  borderBottom: {
    height: 2,
    backgroundColor: COLORS.lightGray,
  },
  borderError: {
    backgroundColor: COLORS.darkRed,
  },
})

TextField.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.string.isRequired,
}
