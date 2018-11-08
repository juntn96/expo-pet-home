import React, { Component } from "react";
import ReactNative, { View, Dimensions, Image, TouchableOpacity, UIManager } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  FooterTab,
  Footer,
  Badge,
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

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={postData.userData.picture} />
            <View>
              <Text>{postData.userData.name}</Text>
              <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
                {postData.postDate}
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
            <Text>{postData.description}</Text>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={postData.postImage[0].uri}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: "#FF8EBC" }}>
              <Icon name="ios-arrow-up" style={{ color: "#FF8EBC" }} />
              <Text>{postData.interactive.upvote}</Text>
            </Button>
            <Button transparent textStyle={{ color: "#00E7C3" }} onPress={() => {this.props.navigation.navigate("Comment")}} >
              <Icon
                name="ios-chatbubbles-outline"
                style={{ color: "#00E7C3" }}
              />
              <Text>{postData.interactive.comment}</Text>
            </Button>
          </Left>

          <Right>
            <Button transparent textStyle={{ color: "#EC466A" }}>
              <Icon name="ios-arrow-down" style={{ color: "#EC466A" }} />
              <Text>{postData.interactive.downvote}</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default PostItem;
