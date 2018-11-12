import React, { Component } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { Button, Text } from "native-base";

class PostOptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      options: [],
    };
  }

  setModalVisible = (visible, options) => {
    console.log(visible, options)
    this.setState({
      modalVisible: visible,
      options: options
    });
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        animationType="fade"
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF90",
            zIndex: 6
          }}
          activeOpacity={1}
          onPress={() => this.setModalVisible(false, [])}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF'
            }}
          >
            {this.state.options.map(option => {
              return (
                <Button full light key={option.name} style={{borderBottomWidth: 0.5, borderBottomColor: '#818181'}} >
                  <Text>{option.name}</Text>
                </Button>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PostOptionModal;
