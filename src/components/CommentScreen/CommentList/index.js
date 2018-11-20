import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import Comment from "./Comment";
import PostServices from "../../../services/PostServices";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    await this._requestGetComments();
  }

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
    const { comments } = this.state;
    return (
      <FlatList
        scrollEnabled={false}
        data={comments}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    );
  }
}

export default CommentList;
