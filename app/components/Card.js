import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { COLORS } from '../config'
import Icon, { ICON_NAMES } from './Icon'

export default class Card extends Component {
  render() {
    const { body, children, title, onLeftButtonPress, onRightButtonPress } = this.props
    return (
      <View style={styles.container}>
        {onLeftButtonPress && <TouchableOpacity
          style={styles.leftButton}
          onPress={() => onLeftButtonPress()}>
          <Icon
            size={24}
            fill={COLORS.gray}
            name={ICON_NAMES.backArrowFilled} />
        </TouchableOpacity>}
        {onRightButtonPress && <TouchableOpacity
          style={styles.rightButton}
          onPress={() => onRightButtonPress()}>
          <Icon
            size={24}
            fill={COLORS.gray}
            name={ICON_NAMES.closeFilled} />
        </TouchableOpacity>}

        <Text style={styles.title}>
          {title}
        </Text>

        {body && <Text style={styles.body}>
          {body}
        </Text>}

        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
  body: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.darkGray,
  },
  leftButton: {
    left: 10,
    top: 10,
    height: 24,
    width: 24,
    position: 'absolute',
    zIndex: 10,
  },
  rightButton: {
    right: 10,
    top: 10,
    height: 24,
    width: 24,
    position: 'absolute',
    zIndex: 10,
  },
})

Card.propTypes = {
  body: PropTypes.string,
  children: PropTypes.array,
  title: PropTypes.string.isRequired,
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func,
}
