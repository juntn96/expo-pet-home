import { createStackNavigator } from 'react-navigation'
import LocationHome from '../../containers/LocationHome'

const LocationRoute = createStackNavigator({
  LocationHome: {
    screen: LocationHome
  }
})

export default LocationRoute;