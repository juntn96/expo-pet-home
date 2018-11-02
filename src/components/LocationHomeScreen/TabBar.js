import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress = index => {
    const { onTabPress } = this.props;
    if (onTabPress) {
      onTabPress(index);
    }
  };

  render() {
    return (
      <View
        style={[
          {
            height: 56,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            backgroundColor: "#CECECE",
          },
          this.props.style,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this._onPress(1);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="ios-list-box-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._onPress(2);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="ios-navigate-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._onPress(3);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="ios-bookmark-outline" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TabBar;
