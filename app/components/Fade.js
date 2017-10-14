import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

export default class Fade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
    }
  }
  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.visible === nextProps.visible) {
      return
    }

    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible })
      this.props.onAnimationCompletion(nextProps.visible)
    })
  }
  render() {
    const { style, children, ...rest } = this.props

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    }

    const combinedStyle = [containerStyle, style]
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    )
  }
}

Fade.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onAnimationCompletion: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  visible: PropTypes.bool,
}
