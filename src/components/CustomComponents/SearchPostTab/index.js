import React, { Component } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Container, Header, Button, Icon } from "native-base";
import PostItem from "../PostList/PostItem";
import PostOptionModal from "../PostOptionModal";
import PostServices from "../../../services/PostServices";

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
    this.optionModal.setModalVisible(true, post, ["Report"]);
  };

  _renderItem = ({ item }) => {
    return (
      <PostItem
        postData={item}
        optionPress={this._optionPress}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    return (
      <Container>
        <PostOptionModal
          ref={ref => (this.optionModal = ref)}
          toast={this.props.toast}
        />
        <Header
          transparent
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#EC466A",
              borderRadius: 5,
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
          }}
        >
          <FlatList
            data={this.state.postData}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />
        </View>
      </Container>
    );
  }
}

export default SearchPostTab;
