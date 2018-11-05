import React, { Component } from "react";
import { View, Animated } from "react-native";
import { Header, Body, Left, Right, Icon, Title, Button } from "native-base";

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
class SimpleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(1),
    };
  }

  animateShow = () => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 1);
  };

  animateHide = () => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 0);
  };

  render() {
    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });

    let transform = [{ translateY: transY }];

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: transform,
        }}
      >
        <Header>
          <Left>
            <Button transparent >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Địa điểm</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.onDirectionPress();
              }}
            >
              <Icon name="md-navigate" />
            </Button>
          </Right>
        </Header>
      </Animated.View>
    );
  }
}

export default SimpleHeader;
