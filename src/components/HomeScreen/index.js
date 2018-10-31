import React, { Component } from "react";
import { View } from "react-native";
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
import TagList from "../TagList";
import CustomHeader from "../CustomComponents/CustomHeader";

import "../CustomComponents/PostOptionModal";

import Modal from "react-native-modalbox";

import ActivityModal from "../CustomComponents/ActivityModal";

import PostItem from "../CustomComponents/PostItem";

import AddPostTab from '../CustomComponents/AddPostTab'

import { postData } from "../../utils/fakeData";

export default class extends Component {
  _openModel = () => {
    this.optionModal.open();
  };

  render() {
    return (
      <Container>
        <ActivityModal
          ref={ref => {
            this.activityModal = ref;
          }}
        />
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
        <Tabs tabBarPosition="bottom" locked={true} >
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-home-outline" />
              </TabHeading>
            }
          >
            <CustomHeader
              title="Pet Home"
              buttonLeft="menu"
              actionLeft={() => {
                this.props.navigation.openDrawer();
              }}
              buttonRight="ios-notifications-outline"
              badgeNumberRight="9"
              actionRight={() => {
                this.activityModal.open();
              }}
            />
            <View>
              <TagList navigation={this.props.navigation} />
            </View>
            <Content>
              <View style={{ margin: 10 }}>
                <List
                  showsVerticalScrollIndicator={false}
                  dataArray={postData}
                  renderRow={item => {
                    return (
                      <PostItem postData={item} optionPress={this._openModel} />
                    );
                  }}
                />
              </View>
            </Content>
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
