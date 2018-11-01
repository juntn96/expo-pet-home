import { createStackNavigator } from "react-navigation";
import HomeScreen from "../../containers/Home";
import CommentScreen from "../../components/CommentScreen";

const HomeRoute = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Comment: {
      screen: CommentScreen
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: () => ({
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
    }),
  }
);

export default HomeRoute;
