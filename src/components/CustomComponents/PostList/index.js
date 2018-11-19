import React, { PureComponent } from "react";
import { FlatList, View, Text, Dimensions, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import PostItem from "./PostItem";
import PostServices from "../../../services/PostServices";
class PostList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.requestGetAll();
  }

  requestGetAll = async () => {
    this._setLoading(true);
    try {
      const result = await PostServices.getAll();
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  requestGetByType = async type => {
    this._setLoading(true);
    try {
      const result = await PostServices.getPostByType(type._id);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _optionPress = post => {
    const { optionPress } = this.props;
    if (optionPress) {
      optionPress(post);
    }
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _renderItem = ({ item }) => {
    return (
      <PostItem
        postData={item}
        optionPress={this._optionPress}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { postData, loading } = this.state;
    if (loading) {
      return (
        <View style={styles.background}>
          <Spinner />
        </View>
      );
    }
    if (postData.length === 0) {
      return (
        <View style={styles.background}>
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

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default PostList;
