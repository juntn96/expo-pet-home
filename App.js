import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Font, AppLoading } from 'expo'
import DrawerRoute from "./src/routes/DrawerRoute";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from "./src/redux/configStore";

const { persistor, store } = configureStore();
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading/>
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <DrawerRoute />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
