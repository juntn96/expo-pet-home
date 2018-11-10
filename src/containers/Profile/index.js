import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ProfileScreen from '../../components/ProfileScreen'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ProfileScreen navigation={this.props.navigation} />
    );
  }
}

export default Profile;
