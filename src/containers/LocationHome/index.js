import React, { Component } from "react";
import { View, Text } from "react-native";
import LocationHomeScreen from "../../components/LocationHomeScreen";

class LocationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LocationHomeScreen/>
    );
  }
}

export default LocationHome;
