import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { List, Left, Body, ListItem, Thumbnail, Text } from "native-base";
import { connect } from "react-redux";
import MessageServices from "../../../services/MessageServices";

import ChatModal from "../ChatModal";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
    };
  }

  componentDidMount() {
    this._requestGetConversation();
  }

  _requestGetConversation = async () => {
    try {
      const { userData } = this.props.auth;
      const result = await MessageServices.getAllConversation(userData._id);
      this.setState({ conversation: result });
    } catch (error) {
      throw error;
    }
  };

  _renderItem = ({ item }) => {
    const { userData } = this.props.auth;
    const receiver = item.users.filter(data => data.user._id !== userData._id);
    const date = new Date(item.createdAt);
    const messages = item.messages;
    let lastMes = "";
    if (messages.length > 0) {
      lastMes = messages[messages.length - 1];
      if (lastMes.sender === userData._id) {
        lastMes = "Bạn: " + lastMes.content;
      } else {
        lastMes = lastMes.content;
      }
    }
    return (
      <ListItem
        avatar
        onPress={() => {
          this.chatModel.setModalVisible(true, item);
        }}
      >
        <Left>
          <Thumbnail small circular source={{ uri: receiver[0].user.avatar }} />
        </Left>
        <Body>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                flex: 1,
              }}
            >
              {receiver[0].user.appName}
            </Text>
            <Text note style={{fontSize: 10}} >{date.toLocaleTimeString()}</Text>
          </View>
          <Text note numberOfLines={1}>
            {lastMes}
          </Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    const { conversation } = this.state;
    return (
      <View>
        <ChatModal
          ref={ref => {
            this.chatModel = ref;
          }}
          userData={this.props.auth.userData}
        />
        <FlatList
          data={conversation}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(MessageList);
