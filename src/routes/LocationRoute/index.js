import { createStackNavigator } from 'react-navigation'
import LocationHome from '../../containers/LocationHome'

const LocationAuth = createStackNavigator({
  LocationHome: {
    screen: LocationHome
  }
})

export default LocationAuth;