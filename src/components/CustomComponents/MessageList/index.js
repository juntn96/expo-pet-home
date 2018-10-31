import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  List,
  Left,
  Body,
  Right,
  ListItem,
  Thumbnail,
  Text,
  Button,
  Icon,
} from "native-base";

const data = [1, 2, 3, 4, 5, 6, 7, 8];

import ChatModal from '../ChatModal'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    return (
      <ListItem avatar onPress={() => {this.chatModel.open()}} >
        <Left>
          <Thumbnail
            circular
            source={require("../../../assets/images/bg1.png")}
          />
        </Left>
        <Body>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1
              }}
            >Lam Ngoc Khanh</Text>
            <Text note>3:43 pm</Text>
          </View>
          <Text note numberOfLines={1}>
            xin chao. ban co an rau ren k
          </Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <View>
        <ChatModal ref={ref => {this.chatModel = ref}} />
        <List dataArray={data} renderRow={item => this._renderItem(item)} />
      </View>
    );
  }
}

export default MessageList;
