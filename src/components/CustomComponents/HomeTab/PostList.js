import React, { Component } from "react";
import { FlatList, View, Text, Dimensions } from "react-native";
import PostItem from "./PostItem";
import PostServices from "../../../services/PostServices";
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
    };
  }

  async componentDidMount() {
    this.requestGetAll();
  }

  requestGetAll = async () => {
    try {
      const result = await PostServices.getAll();
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  requestGetByType = async type => {
    try {
      const result = await PostServices.getPostByType(type._id);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  _renderItem = ({ item }) => {
    return (
      <PostItem
        postData={item}
        optionPress={this._openModel}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { postData } = this.state;
    if (postData.length === 0) {
      return (
        <View
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text>Không có bài viết</Text>
        </View>
      );
    }
    return (
      <FlatList
        onScroll={this.props.onScroll}
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
        data={postData}
        renderItem={this._renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
    );
  }
}

export default PostList;
