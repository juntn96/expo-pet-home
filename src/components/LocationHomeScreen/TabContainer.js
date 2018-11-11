import React, { Component } from "react";
import { View, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class TabContainer extends Component {
  render() {
    return (
      <View
        {...this.props}
        style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      >
        {this.props.children}
      </View>
    );
  }
}

export default TabContainer;
