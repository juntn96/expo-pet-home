import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import CustomHeader from '../CustomHeader'

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "An rau ren ko",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Lam Ngoc Khanh",
            avatar: require("../../../assets/images/bg1.png"),
          },
        },
      ],
    });
  }

  open = () => {
    this.setState({
      modalVisible: true,
    });
  };

  close = () => {
    this.setState({
      modalVisible: false,
    });
  };

  _onDismiss = () => {
    
  }

  _onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {}}
        onDismiss={this._onDismiss}
      >
        <CustomHeader
          title="Khanh Dai Ka"
          buttonLeft="md-close"
          actionLeft={() => {
            this.close();
          }}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => {
            this._onSend(messages);
          }}
          user={{
            _id: 1,
          }}
        />
      </Modal>
    );
  }
}

export default ChatModal;
