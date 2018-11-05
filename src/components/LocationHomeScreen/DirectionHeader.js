import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Container, Button, Icon } from "native-base";

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
class DirectionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(0),
      locationItem: null,
    };
  }

  animateShow = locationItem => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 1);
  };

  animateHide = () => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 0);
    this.setState({
      locationItem: null,
    });
  };

  setItemLocation = locationItem => {
    this.setState({
      locationItem: locationItem,
    });
  };

  _onStartDirection = () => {
    const { onStartDirection } = this.props
    if (onStartDirection) {
      onStartDirection(null, this.state.locationItem.coordinate)
    }
  }

  render() {
    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    let transform = [{ translateY: transY }];

    const { locationItem } = this.state;

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#00cc99",
          transform: transform,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Button
            transparent
            onPress={() => {
              this.props.onBackPress();
            }}
          >
            <Icon name="ios-arrow-back-outline" style={{ color: "#FFF" }} />
          </Button>
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "#FFFFFF80",
                padding: 8,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#FFF",
                }}
              >
                Vị trí của bạn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "#FFFFFF80",
                padding: 8,
                borderRadius: 5,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#FFF",
                }}
              >
                {locationItem ? locationItem.name : "Vị trí dẫn đường"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this._onStartDirection}
            activeOpacity={0.7}
            style={{
              backgroundColor: "transparent",
              padding: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontWeight: "bold",
              }}
            >
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default DirectionHeader;
