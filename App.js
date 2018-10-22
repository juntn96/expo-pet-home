import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import DrawerRoute from "./src/routes/DrawerRoute";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from "./src/redux/configStore";

const { persistor, store } = configureStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <DrawerRoute />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : 20,
    backgroundColor: "#FFF",
  },
});
