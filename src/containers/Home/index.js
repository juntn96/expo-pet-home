import React, { Component } from "react";
import { View, Text } from "react-native";
import HomeScreen from "../../components/HomeScreen";

class Home extends Component {

  render() {
    return <HomeScreen navigation={this.props.navigation} />;
  }
}

export default Home;
