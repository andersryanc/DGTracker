import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FLAT_COLORS } from '../config'
import Icon, { ICON_NAMES } from '../components/Icon'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [
        { key: 1, name: 'Pier Park' },
        { key: 2, name: 'Vance' },
        { key: 3, name: 'Dabney' },
      ]
    }
  }

  _addItem = () => {
    this.setState({
      courses: [
        ...this.state.courses,
        { key: this.state.courses.length + 1, name: 'New Course' },
      ]
    })
  }

  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>
          {item.name}
        </Text>
      </View>
      <View style={styles.itemSep} />
    </View>
  )

  _showMenu = () => {

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Courses</Text>

          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPress={this._showMenu.bind(this)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon
              name={ICON_NAMES.cog}
              size={24}
              fill={'white'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPress={this._addItem.bind(this)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon
              name={ICON_NAMES.plus}
              size={24}
              fill={'white'}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.courses}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const STATUS_BAR_HEIGHT = 20

const styles = StyleSheet.create({
  container: {
    backgroundColor: FLAT_COLORS.emerald,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
  item: {
    // alignItems: 'center',
  },
  itemContent: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
  },
  itemTitle: {
    color: 'white',
  },
  itemSep: {
    height: 1,
    backgroundColor: FLAT_COLORS.nephritis,
    alignSelf: 'stretch',
  },
})

Home.propTypes = {
}

export default connect(
  state => ({
  }),
  dispatch => ({
  })
)(Home)
