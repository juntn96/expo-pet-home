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
      },
      headerRight: (
        <Button transparent style={{ height: 56 }}>
          <Icon name="search" style={{ color: "#000" }} />
        </Button>
      ),
      headerLeft: (
        <Button
          transparent
          style={{ height: 56 }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" style={{ color: "#000" }} />
        </Button>
      ),
    }),
  }
);

export default HomeRoute;
