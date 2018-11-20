import React, { Component } from "react";
import { View, Image } from "react-native";
import { Container, Content, Text } from "native-base";
import Footer from "./Footer";
import CommentList from "./CommentList";
import Header from "./Header";
import PostGridImage from "../CustomComponents/PostGridImage";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _sendCommentCallback = () => {
    this.commentList._requestGetComments()
  };

  render() {
    const { postData } = this.props.navigation.state.params;
    return (
      <Container>
        <Header navigation={this.props.navigation} postData={postData} />
        <Content style={{ flex: 1 }}>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Text>{postData.title}</Text>
            <View style={{ height: 4 }} />
            <PostGridImage images={postData.images} />
          </View>
          <CommentList
            postData={postData}
            ref={ref => (this.commentList = ref)}
          />
        </Content>
        <Footer
          postData={postData}
          userData={this.props.userData}
          sendCommentCallback={this._sendCommentCallback}
        />
      </Container>
    );
  }
}
