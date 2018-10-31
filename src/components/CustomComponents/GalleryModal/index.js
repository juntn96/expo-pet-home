import React, { Component } from "react";
import { View, Text, Modal, FlatList } from "react-native";
import { Button, Icon } from "native-base";
import { ImagePicker, Permissions, FileSystem, MediaLibrary } from "expo";
import CustomHeader from "../../CustomComponents/CustomHeader";

import PhotoList from "./PhotoList";
import Photo from "./Photo";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      photos: [],
      selectedPhotos: [],
    };
  }

  componentDidMount = async () => {
    const info = await MediaLibrary.getAssetsAsync();
    this.setState({
      photos: info.assets,
    });
  };

  _setModalVisible = () => {
    this.setState({selectedPhotos: []})
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  _onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state.selectedPhotos);
      this._setModalVisible();
    }
  };

  _onItemPress = (type, photo) => {
    let tmp = this.state.selectedPhotos;
    if (type === "add") {
      tmp.push(photo);
    } else {
      tmp = tmp.filter(value => value.id !== photo.id);
    }
    this.setState({
      selectedPhotos: tmp,
    });
  };

  _renderItem = ({ item }) => {
    return (
      <Photo
        item={item}
        size={this.state.selectedPhotos.length}
        onItemPress={this._onItemPress}
      />
    );
  };

  render() {
    const { photos, selectedPhotos, modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this._onSubmit()
          }}
        >
          <CustomHeader
            title={selectedPhotos.length !== 10 ? selectedPhotos.length : "Max"}
            buttonLeft="md-close"
            actionLeft={() => {
              this._setModalVisible();
            }}
            buttonRight={selectedPhotos.length !== 0 ? "md-add" : null}
            actionRight={() => {
              if (selectedPhotos.length === 0) return;
              this._onSubmit();
            }}
          />
          <FlatList
            numColumns={3}
            data={photos}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              justifyContent: "space-around",
            }}
          />
        </Modal>
        <Button transparent onPress={this._setModalVisible}>
          <Icon name="ios-images" />
        </Button>
      </View>
    );
  }
}
