import React, { Component } from "react";
import {
  Text,
  Animated,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HEADER_MAX_HEIGHT = 200;

const NAME_MAX_WIDTH = SCREEN_WIDTH - 100;
const NAME_MAX_HEIGHT = 24;

class AnimatedName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSize: {
        height: NAME_MAX_HEIGHT,
        width: NAME_MAX_WIDTH,
      },
    };
  }

  render() {
    const { animatedValue, userData } = this.props;
    const { nameSize } = this.state;

    let nameTransX = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [SCREEN_WIDTH / 2 - nameSize.width / 2, 70],
      extrapolate: "clamp",
    });

    let nameTransY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [-10, -27 + nameSize.height / 2 - 4],
      extrapolate: "clamp",
    });

    let nameScale = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          transform: [
            {
              translateX: nameTransX,
            },
            {
              translateY: nameTransY,
            },
            {
              scale: nameScale,
            },
          ],
          bottom: 0,
          left: 0,
        }}
      >
        <Text
          onLayout={event => {
            let nameSize = event.nativeEvent.layout;
            this.setState({ nameSize: nameSize });
          }}
          numberOfLines={1}
          style={{
            fontWeight: "bold",
            fontSize: 20,
            position: "absolute",
            bottom: 0,
            color: "#212121",
          }}
        >
          {userData.name}
        </Text>
      </Animated.View>
    );
  }
}

export default AnimatedName;
