import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";

import * as Strings from "../../../constants/strings";

import { GoogleMap } from "../../../services/Map";

const { Marker, Polyline } = MapView;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      coords: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
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
    const result = await GoogleMap.getDirections(startLoc, destinationLoc);
    console.log(result);
    if (result) {
      this.setState({ coords: result });
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

  _onMapPress = (event) => {
    const { onMapPress } = this.props
    if (onMapPress) {
      onMapPress()
    }
  }

  render() {
    const { location } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          onPress={this._onMapPress}
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
            strokeColor="red"
          />
        </MapView>
        
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
