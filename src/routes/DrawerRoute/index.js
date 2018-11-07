import { createDrawerNavigator } from "react-navigation";
import { Dimensions } from "react-native";

import HomeRoute from "../HomeRoute";
import AuthRoute from "../AuthRoute";
import LocationRoute from "../LocationRoute";
import CustomDrawer from "../../components/CustomComponents/CustomDrawer";
import ProfileRoute from "../ProfileRoute";
import PetRoute from "../PetRoute";

const DrawerRoute = createDrawerNavigator(
  {
    AuthRoute: {
      screen: AuthRoute,
    },
    HomeRoute: {
      screen: HomeRoute,
    },
    LocationRoute: {
      screen: LocationRoute,
    },
    ProfileRoute: {
      screen: ProfileRoute,
    },
    PetRoute: {
      screen: PetRoute,
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
