import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

export default class extends Component {
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AuthRoute')
          }}
          activeOpacity={0.7}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="ios-settings-outline"
            style={{
              color: "#B5B5B5",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 4,
            alignItems: "center",
          }}
        >
          <Icon
            onPress={() => {this.props.navigation.navigate('HomeRoute')}}
            name="ios-home-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
          <Icon
            onPress={() => {this.props.navigation.navigate('LocationRoute')}}
            name="ios-map-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
          <Icon
            name="ios-heart-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
          <Icon
            name="ios-notifications-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
          <Icon
            name="ios-chatbubbles-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
          <Icon
            name="ios-bookmark-outline"
            style={{
              color: "#B5B5B5",
              marginBottom: 20,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="md-log-out"
            style={{
              color: "#B5B5B5",
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width / 3.5,
    backgroundColor: "#FFF",
  },
});
