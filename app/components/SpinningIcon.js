import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'
import Icon, { ICON_NAMES } from './Icon'

export default class SpinningIcon extends Component {
  constructor(props) {
    super(props)
    this.state = { rotation: new Animated.Value(0) }
  }
  componentDidMount() {
    this._animate()
  }
  componentWillUnmount() {
    this.state.rotation.stopAnimation()
  }
  _animate() {
    this.state.rotation.setValue(0)
    this._anim = Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(this._animate.bind(this))
  }
  render() {
    const { name, ...rest } = this.props
    return (
      <Animated.View style={{
        transform: [{
          rotate: this.state.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }]
      }}>
        <Icon name={name || ICON_NAMES.faSpinner} {...rest} />
      </Animated.View>
    )
  }
}

SpinningIcon.propTypes = {
  name: PropTypes.string,
}
