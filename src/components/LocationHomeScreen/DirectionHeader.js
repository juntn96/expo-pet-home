import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Container, Button, Icon } from "native-base";

class DirectionHeader extends Component {
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
            backgroundColor: "#00cc99",
          },
          this.props.style,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Button
            transparent
            onPress={() => {
              this.props.onDirectionPress();
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
                style={{
                  color: "#FFF",
                }}
              >
                Your Location
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
                style={{
                  color: "#FFF",
                }}
              >
                Location direction
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
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
      </View>
    );
  }
}

export default DirectionHeader;
