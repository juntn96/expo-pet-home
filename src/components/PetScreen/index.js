import React, { Component } from "react";
import { View, FlatList } from "react-native";
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
import CustomHeader from "../CustomComponents/CustomHeader";
import MatchPetTab from "../CustomComponents/MatchPetTab";
import EditPetTab from "../CustomComponents/EditPetTab";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Tabs
          tabBarPosition="bottom"
          locked
          tabBarUnderlineStyle={{ backgroundColor: "#FFF" }}
        >
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#2A2E40",
                }}
              >
                <Icon name="md-heart-outline" style={{ color: "#FFF" }} />
              </TabHeading>
            }
          >
            <MatchPetTab
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#2A2E40",
                }}
              >
                <Icon name="ios-paw-outline" style={{ color: "#FFF" }} />
              </TabHeading>
            }
          >
            <EditPetTab
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#2A2E40",
                }}
              >
                <Icon name="md-clipboard" style={{ color: "#FFF" }} />
              </TabHeading>
            }
          >
            <View />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
