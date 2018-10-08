import { createDrawerNavigator } from "react-navigation";
import { Dimensions } from "react-native";

import HomeRoute from "../HomeRoute";
import AuthRoute from "../AuthRoute";
import LocationRoute from "../LocationRoute";
import CustomDrawer from "../../components/CustomComponents/CustomDrawer";

const DrawerRoute = createDrawerNavigator(
  {
    AuthRoute: {
      screen: AuthRoute,
    },
    HomeRoute: {
      screen: HomeRoute,
    },
    LocationRoute: {
      screen: LocationRoute
    },
  },
  {
    contentComponent: CustomDrawer,
    style: {
      backgroundColor: "transparent",
    },
    drawerWidth: Dimensions.get("screen").width / 3.5,
    drawerBackgroundColor: "transparent",
    initialRouteName: "HomeRoute",
  }
);

export default DrawerRoute;
