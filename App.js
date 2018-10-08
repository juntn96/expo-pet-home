import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import DrawerRoute from "./src/routes/DrawerRoute";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DrawerRoute />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : 20,
    backgroundColor: "#FFF"
  },
});
