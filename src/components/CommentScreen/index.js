import React, { Component } from "react";
import { View, Image } from "react-native";
import { Container, Content, Text } from "native-base";
import Footer from "./Footer";
import CommentList from "./CommentList";
import Header from "./Header";
import PostGridImage from "../CustomComponents/PostGridImage";
import ReadMoreText from "../CustomComponents/ReadMoreText";
import PostServices from "../../services/PostServices";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: undefined,
      userData: undefined,
    };
  }

  _sendCommentCallback = () => {
    this.commentList._requestGetComments();
  };

  componentDidMount() {
    this._getPostById();
    const userData = this.props.navigation.getParam("userData");
    this.setState({ userData });
  }

  _getPostById = async () => {
    try {
      const postId = this.props.navigation.getParam("postId");
      const result = await PostServices.getPostById(postId);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { postData, userData } = this.state;
    if (!postData) return null;
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
            <ReadMoreText numberOfLines={3}>
              <Text>{postData.title}</Text>
            </ReadMoreText>
            <View style={{ height: 4 }} />
            <PostGridImage images={postData.images} />
          </View>
          <CommentList
            postData={postData}
            ref={ref => (this.commentList = ref)}
          />
        </Content>
        {userData ? (
          <Footer
            postData={postData}
            userData={this.state.userData}
            sendCommentCallback={this._sendCommentCallback}
          />
        ) : null}
      </Container>
    );
  }
}
