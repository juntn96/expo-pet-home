import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import LocationItem from "./LocationItem";
import DetailModal from "./DetailModal";

import { locationData } from "../../utils/fakeData";

// const data = [1, 2, 3, 4, 5];

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const animationMove = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

class LocationSmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(0),
      scrollEnabled: true,
    };
    this.items = {};
  }

  moveDown = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 1);
  };

  moveUp = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 0);
  };

  _setScrollEnable = enable => {
    this.setState({
      scrollEnabled: enable,
    });
  };

  _onLongPress = id => {
    setTimeout(() => {
      this.items[id].ref.measureInWindow((x, y) => {
        this.modal.showModal({ x, y }, this.items[id].item);
      });
    }, 0);
  };

  _onPress = (item) => {
    const { onItemPress } = this.props
    if (onItemPress) {
      onItemPress(item)
    }
  }

  _onHideModal = id => {
    setTimeout(() => {
      this.items[id].ref.measureInWindow((x, y) => {
        this.modal.hideModal({ x, y });
      });
    }, 0);
  };

  _renderItem = ({ item, index }) => {
    return (
      <View ref={ref => (this.items[item.id] = { ref, item })}>
        <LocationItem
          item={item}
          onLongPress={this._onLongPress}
          onPress={this._onPress}
          onItemMove={this._setScrollEnable}
          isAnimated={!this.state.scrollEnabled}
        />
      </View>
    );
  };

  render() {
    let opacity = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [1, 0, 0, 1],
    });

    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [
        0,
        -200,
        Dimensions.get("screen").height + 100,
        Dimensions.get("screen").height - 150,
      ],
    });

    let transform = [{ translateY: transY }];

    return (
      <View>
        <DetailModal
          ref={ref => {
            this.modal = ref;
          }}
          onHide={this._onHideModal}
        />
        <AnimatedList
          style={[
            {
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              opacity: opacity,
              transform: transform,
              overflow: "visible",
            },
          ]}
          scrollEnabled={this.state.scrollEnabled}
          data={locationData}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default LocationSmallList;
