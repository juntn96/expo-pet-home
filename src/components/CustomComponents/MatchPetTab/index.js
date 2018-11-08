import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Title, Button, Icon } from "native-base";
import PetList from "./PetList";

class MatchPetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <PetList />
        <View
          style={{
            position: "absolute",
            height: 54,
            top: 24,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.openDrawer()}
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="md-menu" style={{ color: "#EC466A", fontSize: 26 }} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="ios-notifications-outline" style={{ color: "#EC466A", fontSize: 26 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MatchPetTab;
