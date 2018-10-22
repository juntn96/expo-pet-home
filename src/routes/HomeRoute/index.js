import { createStackNavigator } from "react-navigation";
import HomeScreen from "../../containers/Home";
import { Button, Icon } from "native-base";
import React from "react";

const HomeRoute = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitle: "Home",
      headerTitleStyle: {
        color: "#000",
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center",
      }
    }),
  }
);

export default HomeRoute;
