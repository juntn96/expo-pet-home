import React, { Component } from "react";
import { View, Text } from "react-native";
import ProfileScreen from "../../components/ProfileScreen";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProfileScreen
        navigation={this.props.navigation}
        userData={this.props.data.userData}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
