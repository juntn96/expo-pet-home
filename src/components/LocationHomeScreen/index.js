import React, { Component } from "react";
import {
  Animated,
  Easing,
  View,
  LayoutAnimation,
  Dimensions,
  StatusBar,
} from "react-native";
import { Container } from "native-base";

import TabBar from "./TabBar";
import LocationMapTab from "../CustomComponents/LocationMapTab";
import SimpleHeader from "./SimpleHeader";
import DirectionHeader from "./DirectionHeader";
import LocationSmallList from "./LocationSmallList";

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
      hiddenAll: false,
      tabIndex: 2,
      hiddenDirection: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { tabIndex } = this.state;
    if (tabIndex === nextState.tabIndex) {
      return false;
    }
    return true;
  }

  _onMapPress = () => {
    if (!this.state.hiddenAll) {
      this.directionHeader.animateHide();
      this.simpleHeader.animateHide();
      this.tabBar.animateHide();
      this.smallList.moveDown();
    } else {
      if (!this.state.hiddenDirection) {
        this.directionHeader.animateShow();
        this.smallList.moveDown();
      } else {
        this.simpleHeader.animateShow();
        this.tabBar.animateShow();
        this.smallList.moveUp();
      }
    }
    this.setState({
      hiddenAll: !this.state.hiddenAll,
    });
  };

  _onTabPress = index => {
    this.setState({
      tabIndex: index,
    });
  };

  _showDirectionHeader = () => {
    if (this.state.hiddenDirection) {
      this.directionHeader.animateShow();
      this.simpleHeader.animateHide();
      this.tabBar.animateHide();
      this.smallList.moveDown();
    } else {
      this.directionHeader.animateHide();
      this.simpleHeader.animateShow();
      this.tabBar.animateShow();
      this.smallList.moveUp();
    }
    this.setState({
      hiddenDirection: !this.state.hiddenDirection,
    });
  };

  _renderTab = () => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    switch (this.state.tabIndex) {
      case 1: {
        return <View />;
      }
      case 2: {
        return <LocationMapTab onMapPress={this._onMapPress} />;
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
        <SimpleHeader
          ref={ref => (this.simpleHeader = ref)}
          onDirectionPress={this._showDirectionHeader}
        />
        <DirectionHeader
          ref={ref => (this.directionHeader = ref)}
          onDirectionPress={this._showDirectionHeader}
        />
        <TabBar
          ref={ref => (this.tabBar = ref)}
          onTabPress={this._onTabPress}
        />
        <LocationSmallList ref={ref => (this.smallList = ref)} />
      </Container>
    );
  }
}
