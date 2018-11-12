import React, { Component } from "react";
import {
  FlatList,
  Animated,
  View,
  NativeModules,
  LayoutAnimation,
  Modal,
} from "react-native";
import { Button, List, Text } from "native-base";
import TagList from "../TagList";

import CustomHeader from "../CustomHeader";

import "../PostOptionModal";

import PostItem from "../PostItem";

import { postData } from "../../../utils/fakeData";

import ActivityModal from "../ActivityModal";
import PostOptionModal from "../PostOptionModal";

const { UIManager } = NativeModules;

// import Modal from "react-native-modalbox";

const BUTTON_HEIGHT = 45;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      scrollDown: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.scrollDown !== nextState.scrollDown;
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  _onScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let direction = currentOffset > this.offset ? "down" : "up";
    this.offset = currentOffset;
    if (direction === "down" && currentOffset > 10) {
      this.setState({ scrollDown: true });
    }
    if (direction === "up" && !this.isCloseToBottom(event.nativeEvent)) {
      this.setState({ scrollDown: false });
    }
  };

  _openModel = () => {
    this.optionModal.setModalVisible(true, [
      {
        name: "Báo cáo bài viết",
      },
    ]);
  };

  _renderTagList = () => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.scrollDown) {
      return null;
    } else {
      return (
        <View>
          <TagList navigation={this.props.navigation} />
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <PostOptionModal ref={ref => (this.optionModal = ref)} />
        <ActivityModal ref={ref => (this.activityModal = ref)} />
        <CustomHeader
          title="Pet Home"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
          buttonRight="ios-notifications-outline"
          badgeNumberRight="9"
          actionRight={() => {
            this.activityModal.setVisible(true);
          }}
        />
        {this._renderTagList()}
        {/* <View style={{ margin: 10 }}>
          
        </View> */}
        <FlatList
          onScroll={this._onScroll}
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({ item }) => {
            return (
              <PostItem
                postData={item}
                optionPress={this._openModel}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={item => item.postId + ""}
          contentContainerStyle={{
            paddingBottom: 70,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        />
      </View>
    );
  }
}

export default HomeTab;
