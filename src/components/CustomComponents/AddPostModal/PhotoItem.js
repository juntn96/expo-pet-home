import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { List, ListItem, Icon } from "native-base";

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress = () => {
    const { removeItem, item } = this.props;
    if (removeItem) {
      removeItem(item);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <ListItem>
        <Image source={{ uri: item.uri }} style={styles.photo} />
        <TouchableOpacity onPress={this._onPress} style={styles.removeBtn}>
          <Icon name="md-close" style={styles.removeIcon} />
        </TouchableOpacity>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 150,
  },
  removeBtn: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    position: "absolute",
    top: 6.5,
    right: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    color: "#FFF",
    fontSize: 10,
  },
});

export default PhotoItem;
