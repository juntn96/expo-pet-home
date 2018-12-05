import React, { PureComponent } from "react";
import { View } from "react-native";
import { Icon, Text } from "native-base";
import CustomButton from "../../CustomButton";
import PostServices from "../../../../services/PostServices";

class Vote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      voteCount: 0,
      loading: false,
      voted: false,
    };
  }

  componentDidMount() {
    this._requestGetVote();
  }

  _requestGetVote = async () => {
    this._setLoading(true);
    try {
      this._setLoading(true);
      const { postData, type, userData } = this.props;
      const result = await PostServices.getVote(postData._id, type);
      this._setVoteCount(result.length);
      if (userData) {
        this._setVoted(result.some(vote => vote.voterId === userData._id));
      }
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _requestVote = async () => {
    this._setLoading(true);
    try {
      const { postData, type, voteCallback, userData } = this.props;
      const data = {
        postId: postData._id,
        voterId: userData._id,
        voteType: type,
        notification: {
          tokens: [postData.ownerId.expoToken],
          data: {
            message: `đã ${
              type === 1 ? "up vote" : "down vote"
            } bài viết của bạn`,
            content: {
              post: {
                _id: postData._id,
              },
            },
            sender: userData._id,
            receiver: postData.ownerId._id,
            type: "post",
          },
        },
      };
      await PostServices.vote(data);
      this._requestGetVote();
      voteCallback(type);
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _setVoteCount = number => {
    this.setState({
      voteCount: number,
    });
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _setVoted = voted => {
    this.setState({
      voted,
    });
  };

  render() {
    const { voteCount, loading, voted } = this.state;
    const { type } = this.props;
    const activeColor = !voted ? "#B5B5B5" : type === 1 ? "#EC466A" : "#FF8EBC";
    const typeIcon = type === 1 ? "ios-arrow-up" : "ios-arrow-down";
    return (
      <CustomButton
        transparent
        textStyle={{ color: activeColor }}
        disabled={loading}
        loginRequired={true}
        onCustomPress={this._requestVote}
      >
        <Icon name={typeIcon} style={{ color: activeColor }} />
        <Text>{voteCount}</Text>
      </CustomButton>
    );
  }
}

export default Vote;
