import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { Button, Icon, Container, Content, Form, Textarea } from "native-base";
import { ImagePicker } from "expo";
import CustomHeader from "../CustomComponents/CustomHeader";
import PostCategories from "./PostCategories";
import GalleryModal from "../CustomComponents/GalleryModal";
import PhotoItem from "./PhotoItem";
import PostServices from "../../services/PostServices";

class AddPostTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      postCategories: [],
      title: "",
      category: null,
      status: 1,
    };
    this.uploadImages = [];
    this.baseState = this.state;
  }

  componentDidMount() {
    this._getCategories();
  }

  _getCategories = async () => {
    try {
      this.setState({ loading: true });
      const rs = await PostServices.getPostCategories();
      this.setState({
        loading: false,
        postCategories: rs,
      });
    } catch (er) {
      console.log(er);
    }
  };

  _onSubmitPicture = images => {
    let tmp = this.state.images;
    tmp = tmp.concat(images);
    this.setState({
      images: tmp,
    });
  };

  _snapPicture = async () => {
    const { Permissions } = Expo;
    const res = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);
    if (res.some(permission => permission.status === "granted")) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        result = {
          ...result,
          id: Date.now(),
        };
        let tmpImages = this.state.images;
        tmpImages.push(result);
        this.setState({
          images: tmpImages,
        });
      }
    } else {
      throw new Error("Camera roll permission not granted");
    }
  };

  _removeImageItem = item => {
    let tmpImages = this.state.images.filter(photo => {
      return photo.id !== item.id;
    });
    this.setState({
      images: tmpImages,
    });
    this.uploadImages = this.uploadImages.filter(image => {
      return image.id !== item.id;
    });
  };

  _onSelectCategory = category => {
    this.setState({
      category,
    });
  };

  _uploadImageCallback = image => {
    this.uploadImages.push(image);
  };

  _requestCreatePost = async () => {
    const { toast } = this.props;
    if (!this._validate()) return;
    try {
      const { title, category, status } = this.state;
      const images = this.uploadImages.map(img => {
        return {
          url: img.url,
          public_id: img.public_id,
          width: img.width,
          height: img.height,
        };
      });
      const ownerId = this.props.userData._id;
      const typeId = category._id;
      const postData = { title, images, typeId, status, ownerId };
      await PostServices.createPost(postData);

      this.props.onCreateDone();
      this.uploadImages = [];
      this.setState(this.baseState);

      toast({ message: "Đăng bài viết thành công", duration: 3000 });
    } catch (error) {
      toast({ message: "Có lỗi xảy ra", duration: 3000 });
    }
  };

  _validate = () => {
    const { title, category, images } = this.state;
    const { toast } = this.props;
    if (title.length === 0) {
      toast({ message: "Hãy viết 1 chút gì đó :D", duration: 3000 });
      return false;
    }
    if (category === null) {
      toast({ message: "Bạn chưa chọn loại bài viết", duration: 3000 });
      return false;
    }
    if (images.length === 0) {
      toast({ message: "Hãy thêm ít nhất 1 ảnh nào", duration: 3000 });
      return false;
    }
    if (this.uploadImages.length !== images.length) {
      toast({ message: "Ảnh của bạn đang upload", duration: 3000 });
      return false;
    }
    return true;
  };

  render() {
    const { userData } = this.props;
    const { postCategories, images } = this.state;
    return (
      <Container>
        <CustomHeader
          title="Tạo bài viết"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
          buttonRight="md-add"
          actionRight={() => {
            this._requestCreatePost();
          }}
        />
        <Content>
          <View style={styles.infoBar}>
            <View style={styles.avatarContainer}>
              {userData ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: userData.avatar,
                  }}
                />
              ) : null}
            </View>
            <Text style={styles.textUsername}>
              {userData ? userData.appName : ""}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.settingContainer}
              onPress={() =>
                this.props.toast({ message: "hello", duration: 3000 })
              }
            >
              <Icon name="md-settings" style={styles.settingIcon} />
            </TouchableOpacity>
          </View>
          <PostCategories
            categories={postCategories}
            onItemPress={this._onSelectCategory}
          />
          <View style={styles.formContainer}>
            <Form>
              <Textarea
                bordered
                placeholder="Hãy viết gì đó nào..."
                rowSpan={(Dimensions.get("screen").height - 100) / 50}
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </Form>
          </View>
          <View>
            <FlatList
              horizontal
              keyExtractor={item => item.uri}
              extraData={images}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <PhotoItem
                    removeItem={this._removeImageItem}
                    item={item}
                    onUploadDone={this._uploadImageCallback}
                  />
                );
              }}
              data={images}
            />
          </View>
          <View style={styles.optionContainer}>
            <Button transparent onPress={this._snapPicture}>
              <Icon name="md-camera" />
            </Button>
            <GalleryModal
              onSubmit={this._onSubmitPicture}
              maxNumber={10 - images.length}
            />
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

export default AddPostTab;
