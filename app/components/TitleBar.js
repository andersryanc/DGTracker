import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { ICON_NAMES } from './Icon'
import { FLAT_COLORS } from '../config'

const TitleBar = ({ title, leftButton, rightButton }) => (
  <View style={styles.titleBar}>
    <Text style={styles.title}>
      {title}
    </Text>

    {leftButton &&
      <TouchableOpacity
        style={[styles.button, styles.leftButton]}
        onPress={leftButton.onPress}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Icon
          name={leftButton.iconName}
          size={24}
          fill={'white'}
        />
      </TouchableOpacity>
    }

    {rightButton &&
      <TouchableOpacity
        style={[styles.button, styles.rightButton]}
        onPress={rightButton.onCancel || rightButton.onPress}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        {rightButton.onCancel ? (
          <Text style={styles.cancel}>Cancel</Text>
        ) : (
            <Icon
              name={rightButton.iconName}
              size={24}
              fill={'white'}
            />
          )
        }
      </TouchableOpacity>
    }
  </View>
)

const ButtonShape = PropTypes.shape({
  iconName: PropTypes.string,
  onPress: PropTypes.func,
})

TitleBar.propTypes = {
  title: PropTypes.string,
  leftButton: ButtonShape,
  rightButton: ButtonShape,
}

const STATUS_BAR_HEIGHT = 20

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: FLAT_COLORS.nephritis,
    width: '100%',
    height: 64,
    paddingTop: STATUS_BAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  button: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    bottom: 0,
    justifyContent: 'center',
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  cancel: {
    color: 'white',
  },
})

export default TitleBar
