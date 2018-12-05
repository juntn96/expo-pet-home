import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import AddPostTab from "../../AddPostTab";

class EditPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      postData: undefined,
    };
  }

  setModalVisible = (visible, postData) => {
    this.setState({
      modalVisible: visible,
      postData,
    });
  };

  render() {
    const { postData, modalVisible } = this.state;
    if (!postData) return null;
    return (
      <Modal transparent={false} visible={modalVisible} animationType="slide">
        <AddPostTab
          postData={postData}
          userData={this.props.userData}
          toast={this.props.toast}
          type="edit"
          closeModal={() => this.setModalVisible(false)}
        />
      </Modal>
    );
  }
}

export default EditPostModal;
