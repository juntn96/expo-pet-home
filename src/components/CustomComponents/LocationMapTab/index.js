import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { locationData } from "../../../utils/fakeData";
import SimpleHeader from "./SimpleHeader";
import DirectionHeader from "./DirectionHeader";
import LocationSmallList from "./LocationSmallList";
import DetailModal from "./DetailModal";
import SimpleSearchModal from "./SimpleSearchModal";
import Map from "./Map";
import FilterModal from "./FilterModal";
import LocationDetailModal from "./LocationDetailModal";
import LocationServices from "../../../services/LocationServices";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHideAll: false,
      isHideDirection: true,
      userLocation: null,
      listLocations: [],
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState(
        {
          userLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        },
        () => {
          this._requestGetLocation();
        }
      );
    }
  };

  _requestGetLocation = async () => {
    try {
      const { userLocation } = this.state;
      const result = await LocationServices.getLocation({
        ...userLocation,
        radius: 3000,
      });
      this.setState({ listLocations: result });
    } catch (error) {
      throw error;
    }
  };

  _onMapPress = () => {
    const { showTabBar } = this.props;
    const { isHideAll, isHideDirection } = this.state;
    if (!isHideAll) {
      this.directionHeader.animateHide();
      this.simpleHeader.animateHide();
      this.smallList.moveDown();
      showTabBar(isHideAll);
    } else {
      if (!isHideDirection) {
        this.directionHeader.animateShow();
        this.smallList.moveDown();
      } else {
        this.simpleHeader.animateShow();
        this.smallList.moveUp();
        showTabBar(isHideAll);
      }
    }
    this.setState({
      isHideAll: !isHideAll,
    });
  };

  _onMarkerPress = locationItem => {
    let itemIndex = this.state.listLocations.indexOf(locationItem);
    this.mapView.moveToCoordinate(locationItem.coordinate);
    this.directionHeader.setDestinationLocation(locationItem);
    this.smallList.scrollToIndex(itemIndex);
    this.simpleHeader.setLocationItem(locationItem);
  };

  _onCalloutPress = locationItem => {
    this.detailModal.setModalVisible(true, locationItem);
  };

  _showDirectionHeader = () => {
    const { showTabBar } = this.props;
    const { isHideDirection } = this.state;
    if (isHideDirection) {
      this.directionHeader.animateShow();
      this.simpleHeader.animateHide();
      this.smallList.moveDown();
      showTabBar(false);
    } else {
      this.directionHeader.animateHide();
      this.simpleHeader.animateShow();
      this.smallList.moveUp();
      showTabBar(true);
    }
    this.setState({
      isHideDirection: !isHideDirection,
    });
  };

  _onSmallItemPress = locationItem => {
    this.mapView.showCallout(locationItem);
    this.mapView.moveToCoordinate(locationItem.coordinate);
    this.simpleHeader.setLocationItem(locationItem);
    this.directionHeader.setDestinationLocation(locationItem);
  };

  _onSearchPress = () => {
    this.searchModal.setModalVisible(true, "destination");
  };

  _onDirectionBackPress = locationItem => {
    this._clearLocationItem(locationItem);
    this.mapView.clearDirection();
    this._showDirectionHeader();
  };

  _onSelectLocationPress = type => {
    this.searchModal.setModalVisible(true, type);
  };

  _clearLocationItem = locationItem => {
    this.mapView.hideCallout(locationItem);
    this.simpleHeader.setLocationItem(null);
    this.directionHeader.setDestinationLocation(null);
  };

  _startDirection = (startLocation, destinationLocation) => {
    this.mapView.startDirection(startLocation, destinationLocation);
  };

  _onLocationChange = (location, type) => {
    const latitude = location.latitude;
    const longitude = location.longitude;
    const coordinate = { latitude: latitude, longitude: longitude };
    if (type === "start") {
      this.directionHeader.setStartLocation(location);
      this.mapView.addSelectLocation(coordinate);
      this.mapView.moveToCoordinate(coordinate);
    }
  };

  render() {
    const { userLocation, listLocations } = this.state;
    return (
      <View style={styles.container}>
        <LocationDetailModal ref={ref => (this.detailModal = ref)} />
        <SimpleSearchModal
          ref={ref => (this.searchModal = ref)}
          userLocation={userLocation}
          onLocationChange={this._onLocationChange}
        />
        {userLocation ? (
          <Map
            ref={ref => (this.mapView = ref)}
            userLocation={userLocation}
            locationData={listLocations}
            onMapPress={this._onMapPress}
            onMarkerPress={this._onMarkerPress}
            onCalloutPress={this._onCalloutPress}
          />
        ) : null}
        <SimpleHeader
          ref={ref => (this.simpleHeader = ref)}
          onDirectionPress={this._showDirectionHeader}
          navigation={this.props.navigation}
          onBackPress={this._clearLocationItem}
          onSearchPress={this._onSearchPress}
        />
        {userLocation ? (
          <DirectionHeader
            ref={ref => (this.directionHeader = ref)}
            onStartDirection={this._startDirection}
            onBackPress={this._onDirectionBackPress}
            onSelectLocationPress={this._onSelectLocationPress}
            userLocation={userLocation}
          />
        ) : null}
        <View style={styles.containerList}>
          <LocationSmallList
            onItemPress={this._onSmallItemPress}
            ref={ref => (this.smallList = ref)}
            locationData={listLocations}
          />
        </View>
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
  containerList: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
  },
});
