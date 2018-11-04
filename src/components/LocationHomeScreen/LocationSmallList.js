import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity
} from "react-native";
import LocationItem from "./LocationItem";

const data = [1, 2, 3, 4, 5];

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const animationMove = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

class LocationSmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(0),
      scrollEnabled: true,
    };
  }

  moveDown = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 1);
  };

  moveUp = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 0);
  };

  _setScrollEnable = enable => {
    this.setState({
      scrollEnabled: enable,
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <LocationItem
        onItemMove={this._setScrollEnable}
        isAnimated={!this.state.scrollEnabled}
      />
    );
  };

  render() {
    let opacity = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [1, 0, 0, 1],
    });

    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [
        0,
        -200,
        Dimensions.get("screen").height + 100,
        Dimensions.get("screen").height - 150,
      ],
    });

    let transform = [{ translateY: transY }];

    return (
      <AnimatedList
          style={[
            {
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              opacity: opacity,
              transform: transform,
              overflow: "visible",
            },
          ]}
          // contentContainerStyle={ {...this.state.stateStyle}}
          scrollEnabled={this.state.scrollEnabled}
          data={data}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
    );
  }
}

export default LocationSmallList;
