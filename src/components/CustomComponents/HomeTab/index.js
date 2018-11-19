import React, { Component } from "react";
import {
  Animated,
  View,
  NativeModules,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import CustomHeader from "../CustomHeader";
import ActivityModal from "../ActivityModal";
import PostOptionModal from "../PostOptionModal";
import PostList from "../PostList";
import TagList from "./TagList";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
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

  _openOptionModel = post => {
    this.optionModal.setModalVisible(true, post, ["Report"]);
  };

  _onCategoryChange = category => {
    try {
      if (category._id === "all") {
        this.postList.requestGetAll();
      } else {
        this.postList.requestGetByType(category);
      }
    } catch (error) {
      throw error;
    }
  };

  _renderTagList = () => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    let stateStyle = { zIndex: 2 };

    if (this.state.scrollDown) {
      stateStyle = { width: 0, height: 0 };
    }
    return (
      <View style={stateStyle}>
        <TagList onCategoryChange={this._onCategoryChange} />
      </View>
    );
  };

  render() {
    return (
      <View>
        <PostOptionModal
          ref={ref => (this.optionModal = ref)}
          toast={this.props.toast}
        />
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
        <PostList
          onScroll={this._onScroll}
          ref={ref => (this.postList = ref)}
          navigation={this.props.navigation}
          optionPress={this._openOptionModel}
          toast={this.props.toast}
        />
      </View>
    );
  }
}

export default HomeTab;
