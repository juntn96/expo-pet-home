import React, { Component } from "react";
import { View, FlatList, Dimensions } from "react-native";
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Icon,
  Header,
  Card,
  CardItem,
  Left,
  Body,
  Right,
} from "native-base";
import EditItem from "./EditItem";
import CustomHeader from "../CustomHeader";

class EditPetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#2A2E40",
        }}
      >
        <CustomHeader
          title="Đã đăng ký"
          buttonLeft="md-menu"
          buttonRight="md-add"
        />
        <FlatList
          contentInset={{ bottom: 20 }}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={item => item + ""}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <EditItem />;
          }}
          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 70,
          }}
        />
      </View>
    );
  }
}

export default EditPetTab;
