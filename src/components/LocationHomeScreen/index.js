import React, { Component } from "react";
import {
  View,
  LayoutAnimation,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container } from "native-base";

import TabBar from "./TabBar";
import LocationMapTab from "../CustomComponents/LocationMapTab";
import TabContainer from "./TabContainer";

import { locationData } from "../../utils/fakeData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SCREENS = [
  {
    index: 0,
    screen: "LIST",
  },
  {
    index: 1,
    screen: "MAP",
  },
  {
    index: 2,
    screen: "SAVED",
  },
];

const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 2,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { tabIndex } = this.state;
    if (tabIndex === nextState.tabIndex) {
      return false;
    }
    return true;
  }

  _showTabBar = show => {
    if (!show) {
      this.tabBar.animateHide();
    } else {
      this.tabBar.animateShow();
    }
  };

  _onTabPress = index => {
    this.tabs.scrollTo({
      x: index * SCREEN_WIDTH,
      y: 0,
      animated: false,
    });
  };

  _renderTab = () => {
    return SCREENS.map(value => {
      if (value.screen === "LIST") {
        return (
          <TabContainer key={value.index}>
            <View
              style={{
                flex: 1,
                backgroundColor: "green",
              }}
            />
          </TabContainer>
        );
      }
      if (value.screen === "MAP") {
        return (
          <TabContainer key={value.index}>
            <LocationMapTab
              showTabBar={this._showTabBar}
              locationData={locationData}
              navigation={this.props.navigation}
            />
          </TabContainer>
        );
      }
      if (value.screen === "SAVED") {
        return (
          <TabContainer key={value.index}>
            <View
              style={{
                flex: 1,
                backgroundColor: "blue",
              }}
            />
          </TabContainer>
        );
      }
    });
  };

  render() {
    return (
      <Container>
        <ScrollView
          ref={ref => this.tabs = ref}
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
        >
          {this._renderTab()}
        </ScrollView>
        <TabBar
          ref={ref => (this.tabBar = ref)}
          onTabPress={this._onTabPress}
        />
      </Container>
    );
  }
}
