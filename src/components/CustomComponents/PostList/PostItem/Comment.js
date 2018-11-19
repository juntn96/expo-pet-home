import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "native-base";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        transparent
        textStyle={{ color: "#00E7C3" }}
        onPress={() => {
          this.props.navigation.navigate("Comment");
        }}
      >
        <Icon name="ios-chatbubbles-outline" style={{ color: "#00E7C3" }} />
        <Text>{"1"}</Text>
      </Button>
    );
  }
}

export default Vote;
