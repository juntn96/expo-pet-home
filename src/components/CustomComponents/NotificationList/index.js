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

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            circular
            source={require("../../../assets/images/bg1.png")}
          />
        </Left>
        <Body>
          <Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Lam Ngoc Khanh
            </Text>
            <Text> đã bình luận về bài viết của bạn </Text>
          </Text>
          <Text note>1h</Text>
        </Body>
        <Right>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="ios-more" />
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  };

  render() {
    return <List dataArray={data} renderRow={item => this._renderItem(item)} />;
  }
}

export default NotificationList;
