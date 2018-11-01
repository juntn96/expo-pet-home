import React, { Component } from "react";
import { View, FlatList } from "react-native";
import {
  Container,
  Content,
  Text,
  Icon,
  List,
  Tabs,
  Tab,
  TabHeading,
} from "native-base";
import TagList from "../CustomComponents/TagList";
import CustomHeader from "../CustomComponents/CustomHeader";

import "../CustomComponents/PostOptionModal";

import Modal from "react-native-modalbox";

import ActivityModal from "../CustomComponents/ActivityModal";

import PostItem from "../CustomComponents/PostItem";

import AddPostTab from "../CustomComponents/AddPostTab";

import HomeTab from '../CustomComponents/HomeTab'

import { postData } from "../../utils/fakeData";

export default class extends Component {
  _openModel = () => {
    this.optionModal.open();
  };

  render() {
    return (
      <Container>
        <Modal
          ref={ref => {
            this.optionModal = ref;
          }}
          position={"bottom"}
          swipeToClose={true}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            backgroundColor: "red",
          }}
        >
          <Text>modal</Text>
        </Modal>
        <Tabs tabBarPosition="bottom" locked={true}>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-home-outline" />
              </TabHeading>
            }
          >
            <HomeTab navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-search" />
              </TabHeading>
            }
          />
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-add-circle-outline" />
              </TabHeading>
            }
          >
            <AddPostTab navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-bookmark-outline" />
              </TabHeading>
            }
          />
        </Tabs>
      </Container>
    );
  }
}
