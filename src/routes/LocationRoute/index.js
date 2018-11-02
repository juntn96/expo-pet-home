import { createStackNavigator } from "react-navigation";
import LocationHome from "../../containers/LocationHome";

const LocationRoute = createStackNavigator(
  {
    LocationHome: {
      screen: LocationHome,
    },
  },
  {
    navigationOptions: {
      header: null,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: "#EC466A",
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center",
      },
    },
  }
);

export default LocationRoute;
