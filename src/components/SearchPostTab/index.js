import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { Container, Header, Button, Icon } from "native-base";
import PostItem from "../CustomComponents/PostList/PostItem";
import ReportModal from "../CustomComponents/PostOptionModal/ReportModal";
import EditPostModal from "../CustomComponents/EditPostModal";
import PostServices from "../../services/PostServices";

class SearchPostTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
    };
  }

  _onSearchQueryChange = async text => {
    try {
      const result = await PostServices.searchPostByText(text);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  _optionPress = post => {
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
                  const tmp = this.state.postData.filter(item => item !== post);
                  this.setState({ postData: tmp });
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

  _renderItem = ({ item }) => {
    return (
      <PostItem
        postData={item}
        optionPress={this._optionPress}
        navigation={this.props.navigation}
        userData={this.props.userData}
      />
    );
  };

  render() {
    const { userData, toast } = this.props;
    return (
      <Container>
        <EditPostModal
          ref={ref => (this.editPostModal = ref)}
          userData={userData}
          toast={toast}
        />
        <ReportModal
          ref={ref => (this.reportModal = ref)}
          toast={this.props.toast}
          userData={userData}
        />
        <Header
          transparent
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              // flex: 1,
              // flexDirection: "row",
              // alignItems: "center",
              // borderWidth: 1.4,
              // borderColor: "#00000035",
              // borderRadius: 10,
              // shadowColor: "#00000070",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 1,
              // shadowRadius: 1,
              // borderTopWidth: 0.4,
              // borderTopColor: "#00000010",
              // borderRightWidth: 0.4,
              // borderRightColor: "#00000020",
              // borderLeftWidth: 0.8,
              // borderLeftColor: "#00000030",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: 'white',
              marginLeft: 2,
              borderRadius: 5,
              shadowColor: "#CACACA",
              shadowOpacity: 0.5,
              shadowRadius: 2,
              shadowOffset: {
                height: 2,
                width: 0,
              },
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <TextInput
                placeholder="Tìm kiếm"
                clearButtonMode={"while-editing"}
                underlineColorAndroid="transparent"
                numberOfLines={1}
                style={{
                  borderBottomWidth: 0,
                  flex: 1,
                }}
                onChangeText={this._onSearchQueryChange}
              />
            </View>
          </View>
        </Header>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {this.state.postData.length > 0 ? (
            <FlatList
              data={this.state.postData}
              keyExtractor={item => item._id}
              renderItem={this._renderItem}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Không có bài viết</Text>
            </TouchableOpacity>
          )}
        </View>
      </Container>
    );
  }
}

export default SearchPostTab;
