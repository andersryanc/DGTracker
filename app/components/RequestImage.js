import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Image, StyleSheet, View, } from 'react-native'
import { COLORS } from '../config/theme'

export default class RequestImage extends PureComponent {
  constructor(props) {
    super(props)
    this.thumbNailOpacity = new Animated.Value(0)
    this.fullOpacity = new Animated.Value(0)
  }
  _onLoad() {
    Animated.timing(this.fullOpacity, {
      toValue: 1,
      duration: 500,
    }).start()
  }
  _onThumbNailLoad() {
    Animated.timing(this.thumbNailOpacity, {
      toValue: 1,
      duration: 500,
    }).start()
  }
  render() {
    let resizeMode = this.props.image.isHorizontal ? 'cover' : 'contain'
    if (this.props.resizeMode) {
      resizeMode = this.props.resizeMode
    }

    return (
      <View style={styles.contain}>
        <View style={styles.loadingBox} />
        <Animated.Image
          style={[styles.generic, { opacity: this.thumbNailOpacity }]}
          resizeMode={resizeMode}
          onLoadEnd={this._onThumbNailLoad.bind(this)}
          source={{ uri: this.props.image.thumbnailUrl }} />
        <Animated.Image
          style={[styles.generic, { opacity: this.fullOpacity }]}
          resizeMode={resizeMode}
          onLoad={this._onLoad.bind(this)}
          source={{ uri: this.props.image.url }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  generic: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  loadingBox: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.darkGray,
    borderWidth: 1,
    flex: 1,
  },
})


RequestImage.propTypes = {
  image: PropTypes.object.isRequired,
  resizeMode: PropTypes.string,
}
