import React, { Component } from "react";
import { View, NativeModules } from "react-native";
import CustomHeader from "../CustomComponents/CustomHeader";
import ActivityModal from "../CustomComponents/ActivityModal";
import PostOptionModal from "../CustomComponents/PostOptionModal";
import PostList from "../CustomComponents/PostList";
import PostCategories from "../CustomComponents/PostCategories";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class HomeTab extends Component {
  constructor(props) {
    super(props);
  }

  _openOptionModel = post => {
    this.optionModal.setModalVisible(true, post, ["Report"]);
  };

  render() {
    const { userData } = this.props;
    return (
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
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
          buttonRight={userData ? "ios-notifications-outline" : null}
          actionRight={() => {
            this.activityModal.setVisible(true);
          }}
        />
        <View style={{ zIndex: 2 }}>
          <PostCategories />
        </View>
        <View style={{ flex: 1 }}>
          <PostList
            ref={ref => (this.postList = ref)}
            navigation={this.props.navigation}
            optionPress={this._openOptionModel}
            toast={this.props.toast}
          />
        </View>
      </View>
    );
  }
}

export default HomeTab;
