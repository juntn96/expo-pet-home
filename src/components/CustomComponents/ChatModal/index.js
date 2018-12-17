import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import CustomHeader from "../CustomHeader";
import MessageServices from "../../../services/MessageServices";
import SocketClient from "socket.io-client";
import { SERVER_INFO } from "../../../constants/config";
const socketIP = SERVER_INFO.PUBLIC_ADDRESS;

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      messages: [],
    };
    this.socket = null;
  }

  componentDidMount() {}

  _connectSocket = conversation => {
    this.socket = SocketClient(`http://${socketIP}:5000`);
    this.socket.emit("joinConversation", conversation);
    this.socket.on("sendMessage", data => {
      console.log("socket id >> ", this.socket.id);
      console.log("response socket >> ", data);
      const mes = {
        _id: data.message._id,
        text: data.message.text,
        createdAt: data.message.createdAt,
        user: data.user,
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, mes),
      }));
    });
  };

  _requestGetMessages = async conversation => {
    try {
      const result = await MessageServices.getMessages(conversation._id);
      let messages = result.messages.map(mes => {
        return {
          _id: mes._id,
          text: mes.content,
          createdAt: mes.createdAt,
          user: {
            _id: mes.sender._id,
            name: mes.sender.appName,
            avatar: mes.sender.avatar,
          },
        };
      });
      messages = messages.reverse();
      this.setState({ messages });
      return true;
    } catch (error) {
      throw error;
    }
  };

  setModalVisible = (visible, conversation) => {
    this.conversation = conversation;
    if (visible) {
      this._requestGetMessages(conversation);
      this._connectSocket(conversation);
    } else {
      this.socket.disconnect();
      this.setState({ messages: [] });
    }
    this.setState({
      modalVisible: visible,
    });
  };

  _onDismiss = () => {};

  _onSend = async (messages = []) => {
    const { userData } = this.props;
    const data = {
      conversationId: this.conversation._id,
      message: messages[0],
      user: {
        _id: messages[0].user._id,
        name: userData.appName,
        avatar: userData.avatar,
      },
    };
    this.socket.emit("sendMessage", data);
  };

  render() {
    const { modalVisible } = this.state;
    const { userData } = this.props;
    return (
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {}}
        onDismiss={this._onDismiss}
      >
        <CustomHeader
          title=""
          buttonLeft="md-close"
          actionLeft={() => {
            this.setModalVisible(false);
          }}
        />
        {modalVisible ? (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => {
              this._onSend(messages);
            }}
            user={{
              _id: userData._id,
            }}
          />
        ) : null}
      </Modal>
    );
  }
}

export default ChatModal;
