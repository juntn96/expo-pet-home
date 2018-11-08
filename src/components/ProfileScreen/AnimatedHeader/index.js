import React, { Component } from "react";
import { View, Animated, Dimensions } from "react-native";

import AnimatedBackground from "./AnimatedBackground";
import AnimatedAvatar from "./AnimatedAvatar";
import AnimatedName from "./AnimatedName";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 74;
const BODY_HEIGHT = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AnimatedHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userData, animatedValue } = this.props;

    let transY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0, HEADER_MIN_HEIGHT - HEADER_MAX_HEIGHT],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          backgroundColor: "#FFFFFF95",
          transform: [
            {
              translateY: transY,
            },
          ],
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: HEADER_MAX_HEIGHT,
        }}
      >
        <AnimatedBackground animatedValue={animatedValue} userData={userData} />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: BODY_HEIGHT,
          }}
        >
          <AnimatedAvatar animatedValue={animatedValue} userData={userData} />

          <AnimatedName animatedValue={animatedValue} userData={userData} />
        </View>
      </Animated.View>
    );
  }
}

export default AnimatedHeader;
