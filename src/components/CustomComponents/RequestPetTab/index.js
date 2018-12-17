import React, { Component } from "react";
import { View, FlatList, Dimensions, Image, SectionList } from "react-native";
import CustomHeader from "../CustomHeader";
import { Button, Text } from "native-base";
import UserServices from "../../../services/UserServices";
import RequestItem from "./RequestItem";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class RequestPetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRequest: [],
    };
  }

  componentDidMount() {
    this._getRequest();
  }

  _getRequest = async () => {
    const { userData } = this.props;
    try {
      const result = await UserServices.getNotificationsByType(
        userData._id,
        "pet"
      );
      this.setState({ listRequest: result });
    } catch (error) {}
  };

  _renderItem = ({ item }) => {
    return (
      <RequestItem
        userData={this.props.userData}
        item={item}
        toast={this.props.toast}
      />
    );
  };

  render() {
    const { listRequest } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#2A2E40",
        }}
      >
        <CustomHeader
          title="Ghép đôi"
          buttonLeft="md-menu"
          actionLeft={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={listRequest}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        />
      </View>
    );
  }
}

export default RequestPetTab;
