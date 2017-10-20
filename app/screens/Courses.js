import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FLAT_COLORS } from '../config'
import Icon, { ICON_NAMES } from '../components/Icon'
import { addItem } from '../redux/actions/courses'
import TitleBar from '../components/TitleBar'

class Courses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItem: null,
    }
  }
  _addItem = () => {
    this.setState({ newItem: { name: '' } })
  }

  _saveItem = () => {
    const { newItem } = this.state

    if (!newItem || newItem.name.length === 0) {
      Alert.alert('Invalid Input', 'You did not specify a name.')
      return
    }

    this.props.addItem(newItem)
    this.setState({ newItem: null })
  }

  _cancel = () => {
    this.setState({ newItem: null })
  }

  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => this.props.navigation.navigate('Course', { course: item })}
      >
        <Text style={styles.itemTitle}>
          {item.name}
        </Text>
        <Icon
          name={ICON_NAMES.chevronRight}
          size={18}
          fill={FLAT_COLORS.nephritis}
        />
      </TouchableOpacity>
      <View style={styles.itemSep} />
    </View>
  )

  _showMenu = () => {
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar
          title="Courses"
          leftButton={{
            iconName: ICON_NAMES.cog,
            onPress: this._showMenu.bind(this),
          }}
          rightButton={{
            iconName: ICON_NAMES.plus,
            onPress: this._addItem.bind(this),
            onCancel: this.state.newItem ? this._cancel.bind(this) : null
          }}
        />

        {this.state.newItem && <View style={styles.newItem}>
          <TextInput
            style={styles.newItemInput}
            value={this.state.newItem.name || ''}
            placeholder="Enter a name"
            onChangeText={value => this.setState({ newItem: { name: value } })}
            onSubmitEditing={this._saveItem.bind(this)}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this._saveItem.bind(this)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>}
        <FlatList
          style={styles.list}
          data={this.props.courses.map(course => ({ ...course, key: course.id }))}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: FLAT_COLORS.emerald,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  newItem: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },
  newItemInput: {
    height: 60,
    paddingHorizontal: 20,
  },
  saveButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    bottom: 0,
    justifyContent: 'center',
  },
  save: {
    color: FLAT_COLORS.nephritis,
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
    paddingLeft: 20,
    paddingRight: 10,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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

Courses.propTypes = {
  addItem: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    courses: state.courses.data,
  }),
  dispatch => ({
    addItem: item => dispatch(addItem(item)),
  })
)(Courses)
