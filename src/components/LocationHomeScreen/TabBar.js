import React, { Component } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Icon } from "native-base";

const ANIMATE_VALUE = {
  Hide: 0,
  Show: 1,
};

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(1),
    };
  }

  animateShow = () => {
    const { animateTrans } = this.state
    transAnimation(animateTrans, 1)
  };

  animateHide = () => {
    const { animateTrans } = this.state
    transAnimation(animateTrans, 0)
  };

  _onPress = index => {
    const { onTabPress } = this.props;
    if (onTabPress) {
      onTabPress(index);
    }
  };

  render() {
    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 1],
      outputRange: [56, 0],
    });

    let transform = [{ translateY: transY }];

    return (
      <Animated.View
        style={{
          height: 56,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          backgroundColor: "#CECECE",
          transform: transform,
        }}
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
      </Animated.View>
    );
  }
}

export default TabBar;
