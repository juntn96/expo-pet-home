import React, { Component } from "react";
import { View, Text, Animated, TouchableOpacity, FlatList } from "react-native";
import PetServices from "../../../../services/PetServices";

const animatedValue = new Animated.Value(0);
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const asyncNextFrame = () => {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
};

const asyncMeasure = component => {
  if (!component) return;
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
};

class ListPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRender: undefined,
      listPet: [],
      viewHeight: 0,
    };
  }

  // componentDidMount() {
  //   this._requestGetListPet();
  // }

  show = async () => {
    animatedValue.stopAnimation();
    await asyncNextFrame();
    if (this.state.canRender) {
      this.hide();
    } else {
      this.setState({ canRender: true });
      await asyncNextFrame();
      await this._requestGetListPet();
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  hide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ canRender: undefined });
    });
  };

  _requestGetListPet = async () => {
    try {
      const { userData } = this.props;
      const result = await PetServices.getPetByOwner(userData._id);
      this.setState({ listPet: result });
      await asyncNextFrame();
      const viewHeight = await asyncMeasure(this.view);
      this.setState({ viewHeight });
      await asyncNextFrame();
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { canRender, listPet, viewHeight } = this.state;

    const transY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-140, -32 - viewHeight / 2],
      extrapolate: "clamp",
    });

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    if (!canRender) return null;

    return (
      <Animated.View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          width: 100,
          position: "absolute",
          padding: 6,
          opacity: animOpacity,
          maxHeight: 100,
          transform: [
            {
              translateY: transY,
            },
          ],
        }}
      >
        <View
          ref={ref => (this.view = ref)}
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={listPet}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    padding: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#00000030",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={{ alignSelf: "center" }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

export default ListPopup;
