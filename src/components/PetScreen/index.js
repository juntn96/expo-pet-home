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
          tabBarUnderlineStyle={{ backgroundColor: "#EC466A" }}
        >
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#50576E",
                }}
              >
                <Icon name="md-heart-outline" style={{ color: "#EC466A" }} />
              </TabHeading>
            }
          >
            <MatchPetTab navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#50576E",
                }}
              >
                <Icon name="ios-paw-outline" style={{ color: "#EC466A" }} />
              </TabHeading>
            }
          >
            <EditPetTab navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#50576E",
                }}
              >
                <Icon name="md-clipboard" style={{ color: "#EC466A" }} />
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
