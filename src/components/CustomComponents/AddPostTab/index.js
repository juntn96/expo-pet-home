import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Button,
  Icon,
  Container,
  Content,
  Form,
  Textarea,
  List,
} from "native-base";
import { ImagePicker } from "expo";
import CustomHeader from "../../CustomComponents/CustomHeader";

import GalleryModal from "../GalleryModal";

import PhotoItem from "./PhotoItem";

import { connect } from "react-redux";

class AddPostModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
  }

  _onSubmitPicture = photos => {
    let tmp = this.state.photos;
    tmp = tmp.concat(photos);
    this.setState({
      photos: tmp,
    });
  };

  _snapPicture = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        result = {
          ...result,
          id: Date.now(),
        };
        console.log(result);
        let tmpPhotos = this.state.photos;
        tmpPhotos.push(result);
        this.setState({
          photos: tmpPhotos,
        });
      }
    } else {
      throw new Error("Camera roll permission not granted");
    }
  };

  _removeItem = item => {
    let tmpPhotos = this.state.photos.filter(photo => {
      return photo.id !== item.id;
    });
    this.setState({
      photos: tmpPhotos,
    });
  };

  render() {
    const { userData } = this.props.data;
    return (
      <Container>
        <CustomHeader
          title="Tạo bài viết"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
          buttonRight="md-add"
        />
        <Content>
          <View>
            <View style={styles.infoBar}>
              <View style={styles.avatarContainer}>
                {userData ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: userData.picture.data.url,
                    }}
                  />
                ) : null}
              </View>
              <Text style={styles.textUsername}>
                {userData ? userData.name : ""}
              </Text>
              <TouchableOpacity style={styles.settingContainer}>
                <Icon name="md-settings" style={styles.settingIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formContainer}>
            <Form>
              <Textarea
                bordered
                placeholder="Write something you'd like"
                rowSpan={(Dimensions.get("screen").height - 100) / 50}
              />
            </Form>
          </View>
          <List
            horizontal
            showsHorizontalScrollIndicator={false}
            renderRow={item => {
              return <PhotoItem removeItem={this._removeItem} item={item} />;
            }}
            dataArray={this.state.photos}
          />
          <View style={styles.optionContainer}>
            <Button transparent onPress={this._snapPicture}>
              <Icon name="md-camera" />
            </Button>
            <GalleryModal onSubmit={this._onSubmitPicture} />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  infoBar: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginLeft: 10,
    marginRight: 4,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  textUsername: {
    fontWeight: "bold",
    flex: 1,
  },
  settingContainer: {
    marginRight: 10,
  },
  settingIcon: {
    fontSize: 20,
    color: "#B5B5B5",
  },
  formContainer: {
    margin: 10,
  },
  optionContainer: {
    height: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostModal);
