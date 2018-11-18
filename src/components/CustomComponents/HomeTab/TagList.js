import React, { Component } from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";
import PostServices from "../../../services/PostServices";

class TagList extends Component {
  state = {
    categories: [{ name: "Tất cả", _id: "all" }],
    selectedCategoryId: "all",
  };

  async componentDidMount() {
    try {
      const rs = await PostServices.getPostCategories();
      this.setState({ categories: this.state.categories.concat(rs) });
    } catch (error) {
      throw error;
    }
  }

  _onItemPress = item => {
    this.setState({ selectedCategoryId: item._id });
    const { onCategoryChange } = this.props;
    if (onCategoryChange) {
      onCategoryChange(item);
    }
  };

  _renderItem = ({ item }) => {
    const { selectedCategoryId } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this._onItemPress(item);
        }}
        style={{
          height: 32,
          borderRadius: 16,
          margin: 10,
          marginBottom: 2,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0.5,
          borderColor: selectedCategoryId === item._id ? "#EC466A" : "#615c70",
          backgroundColor:
            selectedCategoryId === item._id ? "#EC466A" : "#FFFFFF",
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 4,
            marginBottom: 4,
            color: selectedCategoryId === item._id ? "#FFFFFF" : "#615c70",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.categories}
        keyExtractor={item => item._id}
        extraData={this.state.selectedCategoryId}
        showsHorizontalScrollIndicator={false}
        renderItem={this._renderItem}
        style={{
          marginBottom: 10,
        }}
      />
    );
  }
}

export default TagList;
