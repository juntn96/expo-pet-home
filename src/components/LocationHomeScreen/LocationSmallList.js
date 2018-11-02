import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

const data = [1, 2, 3, 4, 5];

class LocationSmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#c5c5c590",
          marginLeft: 10,
          marginRight: 20,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Day la ten location
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#615c70",
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 12 }}>4.5/5 - Cách bạn 1.2Km</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        style={[
          {
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
          },
          this.props.style,
        ]}
        data={data}
        renderItem={this._renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

export default LocationSmallList;
