import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PetScreen from '../../components/PetScreen'

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <PetScreen navigation={this.props.navigation} />
    );
  }
}

export default Pet;
