import React, { Component } from "react";
import { View, NativeModules, ActionSheetIOS, Alert } from "react-native";
import CustomHeader from "../CustomComponents/CustomHeader";
import ActivityModal from "../CustomComponents/ActivityModal";
import PostOptionModal from "../CustomComponents/PostOptionModal";
import PostList from "../CustomComponents/PostList";
import PostCategories from "../CustomComponents/PostCategories";
import ReportModal from "../CustomComponents/PostOptionModal/ReportModal";
import EditPostModal from "../CustomComponents/EditPostModal";
import PostServices from "../../services/PostServices";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class HomeTab extends Component {
  constructor(props) {
    super(props);
  }

  _openOptionModel = post => {
    const { userData } = this.props;
    const isOwner = userData._id === post.ownerId._id;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: isOwner
          ? ["Bỏ qua", "Sửa bài viết", "Xóa bài viết"]
          : ["Bỏ qua", "Báo cáo bài viết"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          if (!isOwner) {
            this.reportModal.setModalVisible(true, post);
          } else {
            this.editPostModal.setModalVisible(true, post);
          }
        }
        if (buttonIndex === 2) {
          Alert.alert(
            "Bạn có chắc muốn xóa bài viết này?",
            undefined,
            [
              {
                text: "Không",
                style: "cancel",
              },
              {
                text: "Có",
                onPress: () => {
                  PostServices.deletePost({ id: post._id });
                  this.props.deletePost(post);
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        }
      }
    );
  };

  render() {
    const { userData, toast } = this.props;
    return (
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        <ReportModal
          ref={ref => (this.reportModal = ref)}
          toast={this.props.toast}
        />
        <EditPostModal
          ref={ref => (this.editPostModal = ref)}
          userData={userData}
          toast={toast}
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
