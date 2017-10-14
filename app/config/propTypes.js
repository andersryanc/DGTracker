import PropTypes from 'prop-types'
import { Marker } from 'react-native-maps'

export const LocationType = PropTypes.shape({
  coordinate: Marker.propTypes.coordinate
})

export const RequestImageType = PropTypes.shape({
  uri: PropTypes.string,
  url: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool.isRequired,
  uploading: PropTypes.bool,
})

export const RequestType = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(RequestImageType),
  status: PropTypes.oneOf(['none', 'incomplete', 'pending']),
})

export const TitleBarButtonType = PropTypes.shape({
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.oneOf(['next', 'back', 'camera', 'cog'])
})
