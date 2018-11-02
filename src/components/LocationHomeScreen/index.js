import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  View,
  LayoutAnimation,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  StatusBar
} from "react-native";
import {
  Tabs,
  Container,
  Header,
  Body,
  Left,
  Right,
  Icon,
  Title,
  Button,
} from "native-base";

import TabBar from "./TabBar";
import LocationMapTab from "../CustomComponents/LocationMapTab";
import SimpleHeader from "./SimpleHeader";
import DirectionHeader from "./DirectionHeader";
import LocationSmallList from "./LocationSmallList";

const AnimatedTab = Animated.createAnimatedComponent(TabBar);
const AnimatedSimpleHeader = Animated.createAnimatedComponent(SimpleHeader);
const AnimatedDirectionHeader = Animated.createAnimatedComponent(
  DirectionHeader
);
const AnimatedSmallList = Animated.createAnimatedComponent(LocationSmallList)

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
      animateToHide: new Animated.Value(1),
      animateDirectionHeader: new Animated.Value(0),
      animateSmallList: new Animated.Value(0),
      hiddenAll: false,
      tabIndex: 2,
      enableAnimate: true,
      hiddenDirection: true,
    };
    StatusBar.setBackgroundColor("#00cc99")
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { animateToHide, hiddenAll, tabIndex } = this.state;
    if (tabIndex === nextState.tabIndex) {
      return false;
    }
    return true;
    
  }

  _onMapPress = () => {
    if (!this.state.enableAnimate) {
      return;
    }
    if (!this.state.hiddenAll) {
      this._setAnimatedState(this.state.animateToHide, 0);
      this._setAnimatedState(this.state.animateDirectionHeader, 0);
      this._setAnimatedState(this.state.animateSmallList, 1, 800)
    } else {
      if (!this.state.hiddenDirection) {
        this._setAnimatedState(this.state.animateDirectionHeader, 1);
        this._setAnimatedState(this.state.animateSmallList, 1)
      } else {
        this._setAnimatedState(this.state.animateToHide, 1);
        this._setAnimatedState(this.state.animateSmallList, 0), 800
      }
    }
    this.setState({
      hiddenAll: !this.state.hiddenAll,
    });
  };

  _setAnimatedState = (animated, value, duration = 200) => {
    Animated.timing(animated, {
      toValue: value,
      duration: duration,
      Easing: Easing,
      useNativeDriver: true,
    }).start();
  };

  _onTabPress = index => {
    this.setState({
      tabIndex: index,
    });
  };

  _showDirectionHeader = () => {
    if (this.state.hiddenDirection) {
      this._setAnimatedState(this.state.animateDirectionHeader, 1);
      this._setAnimatedState(this.state.animateToHide, 0);
      this._setAnimatedState(this.state.animateSmallList, 1, 800)
    } else {
      this._setAnimatedState(this.state.animateDirectionHeader, 0);
      this._setAnimatedState(this.state.animateToHide, 1);
      this._setAnimatedState(this.state.animateSmallList, 0, 800)
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
    console.log("render");

    let tabTranslateY = this.state.animateToHide.interpolate({
      inputRange: [0, 1],
      outputRange: [56, 0],
    });

    let headerTranslateY = this.state.animateToHide.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });

    let directionTranslateY = this.state.animateDirectionHeader.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    let smallListTranslateY = this.state.animateSmallList.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [0, -200, Dimensions.get("screen").height + 150, Dimensions.get("screen").height - 150]
    })

    let listOpacity = this.state.animateSmallList.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [1, 0, 0, 0, 1]
    })

    let tabTransform = [{ translateY: tabTranslateY }];
    let headerTransform = [{ translateY: headerTranslateY }];
    let directionTransform = [{ translateY: directionTranslateY }];
    let smallListTransform = [{translateY: smallListTranslateY}]

    return (
      <Container>
        {this._renderTab()}
        <AnimatedSimpleHeader
          style={{ transform: headerTransform }}
          onDirectionPress={this._showDirectionHeader}
        />
        <AnimatedDirectionHeader
          style={{ transform: directionTransform }}
          onDirectionPress={this._showDirectionHeader}
        />
        <AnimatedSmallList 
          style={{ transform: smallListTransform, opacity: listOpacity }}
        />
        <AnimatedTab
          style={{ transform: tabTransform }}
          onTabPress={this._onTabPress}
        />
      </Container>
    );
  }
}
