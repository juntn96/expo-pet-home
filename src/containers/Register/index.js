import React, { Component } from "react";
import { View, Text } from "react-native";
import RegisterScreen from "../../components/RegisterScreen";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RegisterScreen navigation={this.props.navigation} />;
  }
}

export default Register;
