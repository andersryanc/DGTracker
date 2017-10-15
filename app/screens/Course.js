import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FLAT_COLORS } from '../config'
import Icon, { ICON_NAMES } from '../components/Icon'
import { loadRounds, reset } from '../redux/actions/rounds'

const { width } = Dimensions.get('window')

class Course extends Component {
  componentWillMount() {
    const { course } = this.props.navigation.state.params
    this.props.loadRounds(course.id)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  _addItem = () => {
    Alert.alert('Begin Round', 'This feature has not been implemented yet.')
  }

  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => alert('you tapped item: ' + item.id)}
      >
        <Text style={styles.itemTitle}>
        </Text>
      </TouchableOpacity>
      <View style={styles.itemSep} />
    </View>
  )

  render() {
    const { course } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            {course.name}
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPress={() => this.props.navigation.goBack()}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon
              name={ICON_NAMES.chevronLeft}
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
        {this.props.isLoaded && this.props.rounds.length === 0 && <View style={styles.noRoundsContainer}>
          <Text style={styles.noRoundsTitle}>No Rounds</Text>
          <Text style={styles.noRoundsText}>You haven't played any games yet.</Text>
          <Text style={styles.noRoundsText}>Tap the plus icon above to start a new round.</Text>
        </View>}
        {this.props.isLoaded && this.props.rounds.length > 0 && <FlatList
          style={styles.list}
          data={[]}
          renderItem={this._renderItem}
        />}
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
  cancel: {
    color: 'white',
  },
  noRoundsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRoundsTitle: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.75)',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  noRoundsText: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
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

Course.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loadRounds: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  rounds: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    isLoaded: state.rounds.isLoaded,
    rounds: state.rounds.data,
  }),
  dispatch => ({
    loadRounds: id => dispatch(loadRounds(id)),
    reset: () => dispatch(reset())
  })
)(Course)
