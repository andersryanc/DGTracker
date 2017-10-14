import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SpinningIcon from './SpinningIcon'

const systemButtonOpacity = 0.5

const LargeButton = ({ activeOpacity, backgroundColor, disabled, icon, isLoading, textColor, title, onPress }) => {

  const _computeActiveOpacity = () => {
    if (disabled || isLoading) {
      return 1
    }
    return activeOpacity != null ?
      activeOpacity :
      systemButtonOpacity
  }

  let touchableProps = {
    activeOpacity: _computeActiveOpacity(),
  }
  if (!disabled && !isLoading) {
    touchableProps.onPress = onPress
    // touchableProps.onPressIn = onPressIn;
    // touchableProps.onPressOut = onPressOut;
    // touchableProps.onLongPress = onLongPress;
    // touchableProps.delayPressIn = delayPressIn;
    // touchableProps.delayPressOut = delayPressOut;
    // touchableProps.delayLongPress = delayLongPress;
  }

  const opacity = isLoading ? 0.3 : 1

  return (
    <TouchableOpacity
      {...touchableProps}
      style={[styles.container, { backgroundColor }]}
      accessibilityTraits="button"
      accessibilityComponentType="button">
      {isLoading && <View style={styles.iconContainer}>
        <SpinningIcon size={26} fill={textColor} />
      </View>}
      {icon && React.cloneElement(icon, { style: [icon.props.style, { opacity }] })}
      <Text style={[styles.text, { color: textColor, opacity }]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

LargeButton.propTypes = {
  activeOpacity: PropTypes.number,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default LargeButton
