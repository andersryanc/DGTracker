import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { FLAT_COLORS } from '../config'
import TitleBar from '../components/TitleBar'

import {
  Accelerometer,
  Gyroscope,
  Magnetometer
} from 'NativeModules'

const UPDATE_INTERVAL = 0.1 // in seconds
Accelerometer.setAccelerometerUpdateInterval(UPDATE_INTERVAL)
Gyroscope.setGyroUpdateInterval(UPDATE_INTERVAL)
Magnetometer.setMagnetometerUpdateInterval(UPDATE_INTERVAL)

class Motion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acceleration: { timestamp: 0, x: 0, y: 0, z: 0 },
      gyro: { timestamp: 0, x: 0, y: 0, z: 0 },
      magnet: { timestamp: 0, x: 0, y: 0, z: 0 },
    }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('AccelerationData',
      data => this.setState({ acceleration: data.acceleration })
    )
    Accelerometer.startAccelerometerUpdates()

    DeviceEventEmitter.addListener('GyroData',
      data => this.setState({ gyro: data.rotationRate })
    )
    Gyroscope.startGyroUpdates()

    DeviceEventEmitter.addListener('MagnetometerData',
      data => this.setState({ magnet: data.magneticField })
    )
    Magnetometer.startMagnetometerUpdates() // you'll start getting AccelerationData events above
  }

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates()
    Gyroscope.stopGyroUpdates()
    Magnetometer.stopMagnetometerUpdates()
  }

  render() {
    const { acceleration, gyro, magnet } = this.state

    const DECIMAL_PLACES = 3

    return (
      <View style={styles.container}>
        <TitleBar title="Motion" />

        <View style={styles.motionDataContainer}>
          <Text style={styles.motionDataTitle}>Accel</Text>
          <Text style={styles.motionDataText}>
            x: {acceleration.x.toFixed(DECIMAL_PLACES)}
            {' '}
            y: {acceleration.y.toFixed(DECIMAL_PLACES)}
            {' '}
            z: {acceleration.z.toFixed(DECIMAL_PLACES)}
          </Text>

          <Text style={styles.motionDataTitle}>Gyro</Text>
          <Text style={styles.motionDataText}>
            x: {gyro.x.toFixed(DECIMAL_PLACES)}
            {' '}
            y: {gyro.y.toFixed(DECIMAL_PLACES)}
            {' '}
            z: {gyro.z.toFixed(DECIMAL_PLACES)}
          </Text>

          <Text style={styles.motionDataTitle}>Magnet</Text>
          <Text style={styles.motionDataText}>
            x: {magnet.x.toFixed(DECIMAL_PLACES)}
            {' '}
            y: {magnet.y.toFixed(DECIMAL_PLACES)}
            {' '}
            z: {magnet.z.toFixed(DECIMAL_PLACES)}
          </Text>
        </View>
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
  motionDataContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motionDataTitle: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.75)',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  motionDataText: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
})

Motion.propTypes = {
}

export default connect(
  state => ({
  }),
  dispatch => ({
  })
)(Motion)
