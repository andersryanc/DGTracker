/* flow */

import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native'
import Icon, { ICON_NAMES } from './Icon'
import { COLORS } from '../config'

const PrefrencesHeader = (props: PrefHeaderType) => {
  const { title, onBackPress, rightAction } = props
  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
        style={styles.backButton}
        onPress={() => onBackPress()}>
        <Icon
          width={17} height={28}
          fill="#000"
          name={ICON_NAMES.chevronLeft} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      {rightAction && <View style={styles.rightActionContainer}>
        <TouchableOpacity
          style={styles.rightAction}
          onPress={rightAction.onPress}>
          <Text style={styles.rightActionText}>{rightAction.text}</Text>
        </TouchableOpacity>
      </View>}
    </View>
  )
}

const paddingTop = Platform.OS === 'ios' ? 20 : 0

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 80 : 60,
    paddingTop,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    color: '#000',
    fontWeight: '700',
    textAlign: 'left',
  },
  backButton: {
    width: 17,
    height: 28,
    marginLeft: 20,
    marginRight: 30,
  },
  rightActionContainer: {
    position: 'absolute',
    top: paddingTop,
    right: 20,
    bottom: 0,
    justifyContent: 'center',
  },
  rightAction: {

  },
  rightActionText: {
    color: COLORS.teal,
  },
})

PrefrencesHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
  rightAction: PropTypes.object,
}

export default PrefrencesHeader
