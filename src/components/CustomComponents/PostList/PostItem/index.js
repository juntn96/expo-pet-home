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
import Comment from "./Comment";
import Vote from "./Vote";
import PostGridImage from "../../PostGridImage";
import ReadMoreText from "../../ReadMoreText";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _optionPress = () => {
    const { optionPress, postData } = this.props;
    if (optionPress) {
      optionPress(postData);
    }
  };

  _voteCallback = voteType => {
    if (voteType === 1) {
      this.downVote._requestGetVote();
    } else {
      this.upVote._requestGetVote();
    }
  };

  render() {
    const { postData } = this.props;
    const date = new Date(postData.createdAt);
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: postData.ownerId.avatar }} />
            <View>
              <Text style={{ alignSelf: "flex-start" }}>
                {postData.ownerId.appName}
              </Text>
              <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
                {date.toLocaleDateString()}
              </Text>
            </View>
          </Left>
          <Right style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity
              onPress={this._optionPress}
              hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
              activeOpacity={0.7}
            >
              <Icon name="ios-more" style={{ color: "#000" }} />
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <ReadMoreText numberOfLines={3}>
              <Text>{postData.title}</Text>
            </ReadMoreText>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <View style={{ flex: 1 }}>
            <PostGridImage images={postData.images} />
          </View>
        </CardItem>
        <CardItem>
          <Left>
            <Vote
              ref={ref => (this.upVote = ref)}
              postData={postData}
              type={1}
              voteCallback={this._voteCallback}
            />
            <Comment postData={postData} navigation={this.props.navigation} />
          </Left>
          <Right>
            <Vote
              ref={ref => (this.downVote = ref)}
              postData={postData}
              type={0}
              voteCallback={this._voteCallback}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default PostItem;
