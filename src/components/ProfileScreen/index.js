import React from "react";
import { View, FlatList, Animated, RefreshControl } from "react-native";
import { Container, List, ListItem, Button, Text } from "native-base";
import PostItem from "../CustomComponents/PostList/PostItem";
import AnimatedHeader from "./AnimatedHeader";
import PostOptionModal from "../CustomComponents/PostOptionModal";

import PostServices from "../../services/PostServices";

const animatedValue = new Animated.Value(0);
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const BUTTON_HEIGHT = 45;
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.requestGetByOwner();
  }

  requestGetByOwner = async () => {
    this._setLoading(true);
    try {
      const { userData } = this.props;
      const result = await PostServices.getPostByOwner(userData._id);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _openModel = (post) => {
    this.optionModal.setModalVisible(true, post, ["Edit", "Delete"]);
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  render() {
    const { userData } = this.props;
    return (
      <Container>
        <PostOptionModal ref={ref => (this.optionModal = ref)} />
        <AnimatedHeader
          userData={userData}
          animatedValue={animatedValue}
          navigation={this.props.navigation}
        />
        <AnimatedList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: animatedValue,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={this.state.postData}
          renderItem={({ item }) => {
            return (
              <PostItem
                postData={item}
                optionPress={this._openModel}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: 220,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.requestGetByOwner}
            />
          }
        />
      </Container>
    );
  }
}

export default ProfileScreen;
