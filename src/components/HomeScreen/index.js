import React, { Component } from "react";
import { Container, Text, Icon, Tabs, Tab, TabHeading } from "native-base";

import "../CustomComponents/PostOptionModal";

import Modal from "react-native-modalbox";

import AddPostTab from "../CustomComponents/AddPostTab";

import HomeTab from "../CustomComponents/HomeTab";
export default class extends Component {
  render() {
    return (
      <Container>
        <Tabs tabBarPosition="bottom" locked={true}>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-home-outline" />
              </TabHeading>
            }
          >
            <HomeTab navigation={this.props.navigation} />
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
