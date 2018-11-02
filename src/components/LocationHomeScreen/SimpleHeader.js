import React, { Component } from "react";
import { View } from "react-native";
import { Header, Body, Left, Right, Icon, Title, Button } from "native-base";

class SimpleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
          this.props.style,
        ]}
      >
        <Header>
          <Left>
            <Icon name="md-more" />
          </Left>
          <Body>
            <Title>Location</Title>
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
      </View>
    );
  }
}

export default SimpleHeader;
