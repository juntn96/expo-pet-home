import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "native-base";
import { Notifications } from "expo";
import PostServices from "../../../../services/PostServices";
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
    this.notificationListener = Notifications.addListener(
      this._notificationHandle
    );
  }

  async componentDidMount() {
    await this._requestGetComments();
  }

  _notificationHandle = async notification => {
    try {
      const { userData, postData } = this.props;
      if (postData._id === notification.data.content.post._id) {
        this._requestGetComments();
      }
    } catch (error) {
      throw error;
    }
  };

  _requestGetComments = async () => {
    try {
      const { postData } = this.props;
      const result = await PostServices.getComments(postData._id);
      this.setState({ comments: result });
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <Button
        transparent
        textStyle={{ color: "#00E7C3" }}
        onPress={() => {
          this.props.navigation.navigate("CommentScreen", {
            postId: this.props.postData._id,
            userData: this.props.userData,
          });
        }}
      >
        <Icon name="ios-chatbubbles-outline" style={{ color: "#00E7C3" }} />
        <Text>{this.state.comments.length}</Text>
      </Button>
    );
  }
}

export default Vote;
