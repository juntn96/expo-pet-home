import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";

import * as Strings from "../../../constants/strings";

const { Marker, Polyline } = MapView;

const data = [1, 2, 3, 4, 5];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      coords: []
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._getLocationAsync();
    }
    this._getDirections("21.015806, 105.516287", "21.013369, 105.527366");
  }

  _getDirections = async (startLoc, destinationLoc) => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?
        origin=${startLoc}&
        destination=${destinationLoc}&
        key=${Strings.MAP_API_KEY}`
      );
      let respJson = await resp.json();
      console.log(respJson);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
          return  {
              latitude : point[0],
              longitude : point[1]
          }
      })
      this.setState({coords: coords})
      return coords
    } catch (error) {
      alert(error);
      return error
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      // console.log(location)
      this.setState({ location: location.coords });
    }
  };

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
    const { location } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          minZoomLevel={15}
          maxZoomLevel={18}
          provider={"google"}
          style={styles.map}
          region={{
            latitude: "21.013889",
            longitude: "105.5272135",
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {location ? (
            <Marker coordinate={location} title="User" description="Dia chi" />
          ) : null}
          <Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        </MapView>
        <FlatList
          style={{
            position: "absolute",
            top: 8,
            left: 0,
            right: 0,
          }}
          data={data}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
