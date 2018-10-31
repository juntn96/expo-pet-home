import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import Modal from "react-native-modalbox";

class PostOptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        ref={'modal'}
        {...this.props}
      >
        <Text>modal</Text>
      </Modal>
    );
  }
}

export default PostOptionModal;
