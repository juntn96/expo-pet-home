import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

const data = [1, 2, 3, 4];

export default class extends Component {
  _renderItem = ({ item }) => {
    switch (item) {
      case 1: {
        return (
          <View>
            <View
              style={{
                height: 32,
                backgroundColor: "#CA9DF7",
                borderRadius: 16,
                margin: 10,
                marginBottom: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                #Playground
              </Text>
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: "#22D973",
                marginLeft: 22, 
                marginRight: 22
              }}
            />
          </View>
        );
      }
      case 2: {
        return (
          <View
            style={{
              height: 32,
              backgroundColor: "#FF8EBC",
              borderRadius: 16,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              #Event
            </Text>
          </View>
        );
      }
      case 3: {
        return (
          <View
            style={{
              height: 32,
              backgroundColor: "#FDD84B",
              borderRadius: 16,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              #Trade
            </Text>
          </View>
        );
      }
      case 4: {
        return (
          <View
            style={{
              height: 32,
              backgroundColor: "#7DDFEA",
              borderRadius: 16,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              #SOS
            </Text>
          </View>
        );
      }
      default: {
        return null;
      }
    }
  };

  render() {
    return (
      <FlatList
        renderItem={this._renderItem}
        data={data}
        horizontal={true}
        style={{
          marginTop: 10,
        }}
      />
    );
  }
}
