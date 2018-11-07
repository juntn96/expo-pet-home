import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class AnimatedOptionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, animatedValue } = this.props;

    const animateScale = animatedValue.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.1, 1, 0.1],
    });

    return (
      <Animated.View
        style={{
          overflow: "visible",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          transform: [
            {
              scale: animateScale,
            },
          ],
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            overflow: "hidden",
            backgroundColor: "#FFF",
          }}
        >
          <Image
            source={require("../../../../assets/icons/ic_delete.png")}
            style={{ resizeMode: "cover", width: 15, height: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            overflow: "hidden",
            backgroundColor: "#FFF",
          }}
        >
          <Image
            source={require("../../../../assets/icons/ic_star.png")}
            style={{ resizeMode: "cover", width: 15, height: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            overflow: "hidden",
            backgroundColor: "#FFF",
          }}
        >
          <Image
            source={require("../../../../assets/icons/ic_heart.png")}
            style={{ resizeMode: "cover", width: 15, height: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            overflow: "hidden",
            backgroundColor: "#FFF",
          }}
        >
          <Image
            source={require("../../../../assets/icons/ic_talk.png")}
            style={{ resizeMode: "cover", width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default AnimatedOptionBar;
