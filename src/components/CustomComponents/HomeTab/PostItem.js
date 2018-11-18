import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _openModal = () => {
    const { optionPress, postData } = this.props;
    if (optionPress) {
      optionPress(postData);
    }
  };

  render() {
    const { postData } = this.props;
    const date = new Date(postData.createdAt)
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: postData.images[0].url}} />
            <View>
              <Text style={{alignSelf: "flex-start" }} >{"aaa"}</Text>
              <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
                {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
              </Text>
            </View>
          </Left>
          <Right style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity onPress={this._openModal}  hitSlop={{top: 49, bottom: 40, left: 40, right: 40}} activeOpacity={0.7} >
              <Icon name="ios-more" style={{ color: "#000" }} />
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{postData.title}</Text>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: postData.images[0].url}}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: "#FF8EBC" }}>
              <Icon name="ios-arrow-up" style={{ color: "#FF8EBC" }} />
              <Text>{"1"}</Text>
            </Button>
            <Button transparent textStyle={{ color: "#00E7C3" }} onPress={() => {this.props.navigation.navigate("Comment")}} >
              <Icon
                name="ios-chatbubbles-outline"
                style={{ color: "#00E7C3" }}
              />
              <Text>{"1"}</Text>
            </Button>
          </Left>

          <Right>
            <Button transparent textStyle={{ color: "#EC466A" }}>
              <Icon name="ios-arrow-down" style={{ color: "#EC466A" }} />
              <Text>{"1"}</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default PostItem;
