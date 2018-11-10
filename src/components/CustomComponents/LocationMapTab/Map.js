import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { locationData, markerType } from "../../../utils/fakeData";
import { GoogleMap } from "../../../services/Map";
const { Marker, Polyline, Callout } = MapView;

class Map extends Component {
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
    this.markers = {};
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

  _onMapPress = event => {
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

  _onCalloutPress = locationItem => {
    const { onCalloutPress } = this.props;
    if (onCalloutPress) {
      onCalloutPress(locationItem);
    }
  };

  moveToCoordinate = coordinate => {
    this.mapView.animateToCoordinate(coordinate, 300);
  };

  showCallout = locationItem => {
    if (locationItem) {
      const marker = this.markers[locationItem.id];
      marker.showCallout();
    }
  };

  hideCallout = locationItem => {
    if (locationItem) {
      const marker = this.markers[locationItem.id];
      marker.hideCallout();
    }
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
      <MapView
        ref={ref => (this.mapView = ref)}
        onPress={this._onMapPress}
        showsUserLocation={true}
        provider={"google"}
        style={styles.map}
        initialRegion={location}
      >
        {locationData.map(marker => {
          const markerImage = markerType[marker.type].marker;
          return (
            <Marker
              ref={ref => (this.markers[marker.id] = ref)}
              coordinate={marker.coordinate}
              title={marker.name}
              key={marker.id}
              identifier={marker.id + ""}
              onPress={() => {
                this._onMarkerPress(marker);
              }}
            >
              <Image source={markerImage} />
              <Callout
                onPress={() => {
                  this._onCalloutPress(marker);
                }}
              >
                <View
                  style={{
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/bg3.png")}
                    style={{
                      width: Dimensions.get("window").width / 2.5,
                      height: Dimensions.get("window").width / 2.5,
                      resizeMode: "cover",
                      marginBottom: 10,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {marker.name}
                  </Text>
                  <Text numberOfLines={3} lineBreakMode="tail">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Text>
                </View>
              </Callout>
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
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
