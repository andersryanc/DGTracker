import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { signOut } from '../redux/actions/user'
import Icon, { ICON_NAMES } from '../components/Icon'
import { RatingStars } from '../components'
import { COLORS } from '../config/theme'
import { reset } from '../redux/actions/nav'

const routes = {
  Home: {
    icon: ICON_NAMES.location,
  },
  ProfilePrefs: {
    icon: ICON_NAMES.user,
    label: 'Profile',
    requiresAuth: true,
  },
  PasswordPrefs: {
    icon: ICON_NAMES.question,
    label: 'Change Password',
    requiresAuth: true,
  },
  PaymentPrefs: {
    icon: ICON_NAMES.creditCard,
    label: 'Payments',
    requiresAuth: true,
  },
  Terms: {
    icon: ICON_NAMES.deviceCog,
    label: 'Terms of Use',
    params: {
      titleType: 'Terms of Use',
      screenURL: 'https://www.deeditforward.com/terms-and-conditions/?hide_header=1&hide_footer=1'
    }
  },
  Privacy: {
    icon: ICON_NAMES.deviceLock,
    label: 'Privacy Policy',
    params: {
      titleType: 'Privacy Policy',
      screenURL: 'https://www.deeditforward.com/privacy-policy/?hide_header=1&hide_footer=1'
    }
  }
}

class Preferences extends Component {
  _onNavigatePress(route) {
    this.props.reset(route)
  }
  render() {
    const { activeItemKey, items, user } = this.props
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={[styles.scrollContainer]}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={user && user.avatar ? { uri: user.avatar } : null} />
            <View style={styles.nameContain}>
              <Text style={styles.userName}>{user && user.name ? user.name : 'Deed it Forward'}</Text>
              <Text style={styles.completedRequests}>{user ? '32 Completed Requests' : 'Fundraise by Helping Others'}</Text>
            </View>
          </View>
          {user && <RatingStars numberOfFilled={2} />}

          <View style={styles.links}>
            {items
              .filter(item => user ? true : !routes[item.routeName].requiresAuth)
              .map(item => {
                const itemStyles = [styles.item]
                if (item.key === activeItemKey) {
                  itemStyles.push(styles.activeItem)
                }
                return (<TouchableOpacity key={item.key}
                  onPress={() => this.props.navigation.navigate(item.routeName, routes[item.routeName].params)}
                  style={itemStyles}>
                  <View style={styles.itemContainer}>
                    <Icon size={28} fill={'#000'} name={routes[item.routeName].icon} />
                    <Text style={styles.text}>{routes[item.routeName].label || item.routeName}</Text>
                  </View>
                </TouchableOpacity>)
              })}

            {user && <TouchableOpacity
              onPress={() => {
                this.props.logout()
                this.props.navigation.navigate('Home')
              }}
              style={styles.item}>
              <View style={styles.itemContainer} >
                <Icon
                  size={28}
                  fill={'#000'}
                  name={ICON_NAMES.lock} />
                <Text style={styles.text}>Logout</Text>
              </View>
            </TouchableOpacity>}

            {/**
              * TODO: Figure out a way to launch login modal from here

            !user && <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('DrawerClose')
              }}
              style={styles.item}>
              <View style={styles.itemContainer} >
                <Icon
                  size={28}
                  fill={'#000'}
                  name={ICON_NAMES.lock} />
                <Text style={styles.text}>Login</Text>
              </View>
            </TouchableOpacity>

            */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

Preferences.propTypes = {
  activeItemKey: PropTypes.string,
  items: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  profileContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    width: '100%',
  },
  profileImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.lightGray,
  },
  nameContain: {
    justifyContent: 'center',
    padding: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  completedRequests: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.teal,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  links: {
    marginTop: 20,
    width: '100%',
  },
  item: {
    height: 60,
    padding: 20,
  },
  activeItem: {
    backgroundColor: COLORS.lightGray,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    paddingLeft: 10,
  },
})

export default connect(
  state => ({
    user: state.user.data,
  }),
  dispatch => ({
    reset: (routeName) => dispatch(reset(routeName)),
    logout: () => dispatch(signOut()),
  })
)(Preferences)
