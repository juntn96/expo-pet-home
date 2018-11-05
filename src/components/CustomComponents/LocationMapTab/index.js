import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { Icon } from "native-base";

import * as Strings from "../../../constants/strings";

import { GoogleMap } from "../../../services/Map";

const { Marker, Polyline } = MapView;

import { locationData, markerType } from "../../../utils/fakeData";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: 21.015806,
        longitude: 105.516287,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
      coords: null,
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
  }

  _getDirections = async (startLoc, destinationLoc) => {
    const result = await GoogleMap.getDirections(startLoc, destinationLoc);
    if (result) {
      this.setState({ coords: result });
      this.mapView.fitToCoordinates([startLoc, destinationLoc], {
        edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
        animated: true,
      });
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.mapView.animateToRegion(
        {
          ...location.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        0
      );
      this.setState({
        location: {
          ...location.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      });
    }
  };

  _onMapPress = event => {
    // const coord = event.nativeEvent.coordinate;
    // console.log(event.nativeEvent);
    // if (event.nativeEvent.action === "marker-press") {
    //   // const { location } = this.state;
    //   // this._getDirections(location, coord);
    //   this.moveToCoordinate(coord);
    // }
    if (!event.nativeEvent.action) {
      const { onMapPress } = this.props;
      if (onMapPress) {
        onMapPress();
      }
    }
  };

  _onMarkerPress = locationItem => {
    const { onMarkerPress } = this.props;
    if (onMarkerPress) {
      onMarkerPress(locationItem);
    }
  };

  moveToCoordinate = coordinate => {
    this.mapView.animateToCoordinate(coordinate, 300);
  };

  startDirection = (fromLocation, toLocation) => {
    this._getDirections(
      fromLocation ? fromLocation : this.state.location,
      toLocation
    );
  };

  clearDirection = () => {
    this.setState({
      coords: null,
    });
  };

  render() {
    const { location, coords } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => (this.mapView = ref)}
          onPress={this._onMapPress}
          showsUserLocation={true}
          provider={"google"}
          style={styles.map}
          initialRegion={location}
        >
          {locationData.map(marker => {
            const markerImage = markerType[marker.type];
            return (
              <Marker
                coordinate={marker.coordinate}
                title={marker.name}
                key={marker.id}
                identifier={marker.id + ""}
                onPress={() => {
                  this._onMarkerPress(marker);
                }}
              >
                <Image source={markerImage} />
              </Marker>
            );
          })}
          {coords ? (
            <Polyline
              coordinates={coords}
              strokeWidth={6}
              strokeColor="#CA9DF7"
            />
          ) : null}
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
