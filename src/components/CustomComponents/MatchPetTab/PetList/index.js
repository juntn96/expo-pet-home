import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Title,
  Header,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Button,
} from "native-base";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedOptionBar from "./AnimatedOptionBar";
import AnimatedPetImage from "./AnimatedPetImage";

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const animatedValue = new Animated.Value(0);

class PetList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: "100%",
          backgroundColor: "#2A2E40",
        }}
      >
        <AnimatedTitle
          animatedValue={animatedValue}
          item={item}
          index={index}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text note style={{ color: "#FFF", marginBottom: 10, marginTop: 10 }}>
            Hoàng thượng cần tuyển phi tần :D
          </Text>
          <AnimatedPetImage
            animatedValue={animatedValue}
            item={item}
            index={index}
          />
          <View
            style={{
              height: SCREEN_HEIGHT / 5.5,
              width: "100%",
              overflow: "visible",
            }}
          >
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                width: SCREEN_WIDTH,
              }}
            >
              <AnimatedOptionBar
                animatedValue={animatedValue}
                item={item}
                index={index}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flex: 1,
                backgroundColor: "#50576E",
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 30,
                }}
              >
                <Text>
                  <Text style={{ fontWeight: "bold", color: "#FFF" }}>
                    Kitty:{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#FFF",
                    }}
                  >
                    Mèo, Cái, Scottish, 1 Tuổi
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <AnimatedList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animatedValue,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        horizontal
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => item + ""}
        pagingEnabled
        renderItem={this._renderItem}
      />
    );
  }
}

export default PetList;
