import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Font, AppLoading, Permissions, Notifications } from "expo";
import DrawerRoute from "./src/routes/DrawerRoute";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/redux/configStore";
import Toast from "./src/components/CustomComponents/Toast";
import AppSpinner from './src/components/CustomComponents/AppSpinner';
import { Spinner } from "native-base";
const { persistor, store } = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <DrawerRoute />
            <Toast />
            <AppSpinner />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
