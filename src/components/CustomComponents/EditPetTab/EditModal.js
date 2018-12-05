import React, { Component } from "react";
import { View, Modal, StyleSheet, Dimensions, FlatList } from "react-native";
import {
  Form,
  Container,
  Content,
  Input,
  Label,
  Item,
  Textarea,
  Picker,
  Text,
} from "native-base";
import CustomHeader from "../CustomHeader";
import GalleryModal from "../GalleryModal";
import PhotoItem from "../../AddPostTab/PhotoItem";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      kind: undefined,
      gender: undefined,
      images: [],
    };
    this.uploadImages = [];
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  _onSelectedImages = images => {
    let tmp = this.state.images;
    tmp = tmp.concat(images);
    this.setState({
      images: tmp,
    });
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

  _uploadImageCallback = image => {
    this.uploadImages.push(image);
  };

  render() {
    return (
      <Modal
        transparent
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <Container>
          <CustomHeader
            title="Đăng ký pet"
            buttonLeft="md-close"
            actionLeft={() => this.setModalVisible(false)}
            buttonRight="md-add"
          />
          <Content>
            <View
              style={{
                margin: 10,
              }}
            >
              <Form>
                <View style={styles.formItem}>
                  <Text note>Tên của Pet</Text>
                  <Input style={{ paddingLeft: 16 }} />
                </View>
                <View style={styles.formItem}>
                  <Text note>Tuổi của Pet</Text>
                  <Input
                    style={{ paddingLeft: 16 }}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.formItem}>
                  <Text note>Loài của Pet</Text>
                  <Picker
                    mode="dropdown"
                    placeholder=""
                    style={{ width: "100%" }}
                    selectedValue={this.state.kind}
                    onValueChange={value => this.setState({ kind: value })}
                  >
                    <Picker.Item label="Mèo" value="cat" />
                    <Picker.Item label="Chó" value="dog" />
                    <Picker.Item label="Khác" value="other" />
                  </Picker>
                </View>
                <View style={styles.formItem}>
                  <Text note>Giống của Pet</Text>
                  <Input style={{ paddingLeft: 16 }} />
                </View>
                <View style={styles.formItem}>
                  <Text note>Giới tính của Pet</Text>
                  <Picker
                    mode="dropdown"
                    placeholder=""
                    style={{ width: "100%" }}
                    selectedValue={this.state.gender}
                    onValueChange={value => this.setState({ gender: value })}
                  >
                    <Picker.Item label="Cái" value="0" />
                    <Picker.Item label="Đực" value="1" />
                  </Picker>
                </View>
                <View style={styles.formItem}>
                  <Text note>Giới thiệu về Pet</Text>
                  <Input style={{ paddingLeft: 16 }} />
                </View>
              </Form>
              <FlatList
                horizontal
                data={this.state.images}
                keyExtractor={item => item.uri}
                extraData={this.state.images}
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
              />
            </View>
            <GalleryModal
              onSubmit={this._onSelectedImages}
              maxNumber={10 - this.state.images.length}
            />
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  formItem: {
    borderBottomColor: "#B5B5B5",
    borderBottomWidth: 0.5,
    marginBottom: 6,
  },
});

export default EditModal;
