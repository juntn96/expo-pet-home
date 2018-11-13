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
      coords: null,
      selectLocation: null,
    };
    this.markers = {};
  }

  _getDirections = async (startLoc, destinationLoc) => {
    // console.log('start: ', startLoc)
    // console.log('des: ', destinationLoc)
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

  startDirection = (startLocation, destinationLocation) => {
    this._getDirections(startLocation, destinationLocation);
  };

  clearDirection = () => {
    this.setState({
      coords: null,
    });
  };

  addSelectLocation = location => {
    this.setState({
      selectLocation: location,
    });
  };

  removeSelectLocation = () => {
    this.setState({
      selectLocation: null,
    });
  };

  render() {
    const { location, coords, selectLocation } = this.state;
    const { userLocation } = this.props;
    return (
      <MapView
        ref={ref => (this.mapView = ref)}
        onPress={this._onMapPress}
        showsUserLocation={true}
        provider={"google"}
        style={styles.map}
        initialRegion={userLocation}
      >
        {selectLocation ? <Marker coordinate={selectLocation} /> : null}
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
