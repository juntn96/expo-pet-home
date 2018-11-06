import React, { Component } from "react";
import { View, LayoutAnimation } from "react-native";
import { Container } from "native-base";

import TabBar from "./TabBar";
import LocationMapTab from "../CustomComponents/LocationMapTab";

import { locationData } from "../../utils/fakeData";

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
    this.setState({
      tabIndex: index,
    });
  };

  _renderTab = () => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    switch (this.state.tabIndex) {
      case 1: {
        return <View />;
      }
      case 2: {
        return (
          <LocationMapTab
            showTabBar={this._showTabBar}
            locationData={locationData}
            navigation={this.props.navigation}
          />
        );
      }
      case 3: {
        return <View />;
      }
      default: {
        return null;
      }
    }
  };

  render() {
    return (
      <Container>
        {this._renderTab()}
        <TabBar
          ref={ref => (this.tabBar = ref)}
          onTabPress={this._onTabPress}
        />
      </Container>
    );
  }
}
