import React, { Component } from "react";
import { View, FlatList, Dimensions, Animated, Image } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class AnimatedPetImage extends Component {
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
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              scale: animateScale
            }
          ]
        }}
      >
        <View
          style={{
            borderRadius: SCREEN_WIDTH / 1.5,
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
            overflow: "hidden",
            backgroundColor: "#FFF",
            borderWidth: 5,
            borderColor: "#FFF",
          }}
        >
          <Image
            source={require("../../../../assets/images/bg4.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

export default AnimatedPetImage;
