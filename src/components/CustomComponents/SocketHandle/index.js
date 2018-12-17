import React, { Component } from "react";
import { View, Text } from "react-native";
import MessageServices from "../../../services/MessageServices";
import SocketClient from "socket.io-client";
import { SERVER_INFO } from "../../../constants/config";
const socketIP = SERVER_INFO.PUBLIC_ADDRESS;

class SocketHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._connectSocket();
  }

  _connectSocket = conversation => {
    this.socket = SocketClient(`http://${socketIP}:5000`);
    this.socket.emit("joinConversation", conversation);
    this.socket.on("sendMessage", data => {
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

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default SocketHandle;
