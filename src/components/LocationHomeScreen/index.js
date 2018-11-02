import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Tabs, Tab, Container, Icon, TabHeading } from 'native-base'
import { MapView } from 'expo';

import LocationMapTab from '../CustomComponents/LocationMapTab'

const data = [1, 2 ,3 ,4 ,5]

export default class extends Component {

  render() {
    return (
      <Container>
        <Tabs tabBarPosition="bottom" >
          <Tab
            heading={ <TabHeading><Icon name="ios-list-box-outline" /></TabHeading> }
          >
            <View  />
          </Tab>
          <Tab
            heading={ <TabHeading><Icon name="ios-navigate-outline" /></TabHeading> }
          >
            <LocationMapTab/>
          </Tab>
          <Tab
            heading={ <TabHeading><Icon name="ios-bookmark-outline" /></TabHeading> }
          >
            <View/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
