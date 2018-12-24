import React, { Component } from "react";
import { View, Image, TouchableOpacity, ActionSheetIOS } from "react-native";
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
import ChatModal from "../../ChatModal";
import MessageServices from "../../../../services/MessageServices";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChatModal: false,
    };
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

  _onUserPress = () => {
    const { postData, userData } = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Bỏ qua", "Gửi tin nhắn"],
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          try {
            const users = [
              {
                user: postData.ownerId._id,
              },
              {
                user: userData._id,
              },
            ];
            const conversation = await MessageServices.createConversation(
              users
            );
            this.setState({ renderChatModal: true }, () => {
              this.chatModal.setModalVisible(true, conversation);
            });
          } catch (error) {
            throw error;
          }
        }
      }
    );
  };

  render() {
    const { postData, userData } = this.props;
    const date = new Date(postData.createdAt);
    return (
      <Card>
        {this.state.renderChatModal === true ? (
          <ChatModal ref={ref => (this.chatModal = ref)} userData={userData} />
        ) : null}
        <CardItem>
          <Left>
            <TouchableOpacity
              disabled={userData ? postData.ownerId._id === userData._id : true}
              activeOpacity={0.8}
              onPress={this._onUserPress}
            >
              <Thumbnail source={{ uri: postData.ownerId.avatar }} />
            </TouchableOpacity>
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
            {userData ? (
              <TouchableOpacity
                onPress={this._optionPress}
                hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
                activeOpacity={0.7}
              >
                <Icon name="ios-more" style={{ color: "#000" }} />
              </TouchableOpacity>
            ) : null}
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
              userData={userData}
            />
            <Comment postData={postData} navigation={this.props.navigation} />
          </Left>
          <Right>
            <Vote
              ref={ref => (this.downVote = ref)}
              postData={postData}
              type={0}
              voteCallback={this._voteCallback}
              userData={userData}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default PostItem;
