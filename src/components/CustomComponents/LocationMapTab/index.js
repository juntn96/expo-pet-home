import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { locationData } from "../../../utils/fakeData";
import SimpleHeader from "./SimpleHeader";
import DirectionHeader from "./DirectionHeader";
import LocationSmallList from "./LocationSmallList";
import DetailModal from "./DetailModal";
import SimpleSearchModal from "./SimpleSearchModal";
import Map from "./Map";
import FilterModal from "./FilterModal";
import LocationDetailModal from './LocationDetailModal'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHideAll: false,
      isHideDirection: true,
    };
  }

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
    let itemIndex = locationData.indexOf(locationItem);
    this.mapView.moveToCoordinate(locationItem.coordinate);
    this.directionHeader.setItemLocation(locationItem);
    this.smallList.scrollToIndex(itemIndex);
    this.simpleHeader.setLocationItem(locationItem);
  };

  _onCalloutPress = (locationItem) => {
    this.detailModal.setModalVisible(true, locationItem)
  }

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
    this.mapView.showCallout(locationItem)
    this.mapView.moveToCoordinate(locationItem.coordinate);
    this.simpleHeader.setLocationItem(locationItem);
    this.directionHeader.setItemLocation(locationItem);
  };

  _onSmallItemLongPress = (ref, locationItem) => {
    // setTimeout(() => {
    //   ref.measureInWindow((x, y) => {
    //     this.detailModal.showModal({ x, y }, ref, locationItem);
    //   });
    // }, 0);
  };

  _onHideModal = ref => {
    // setTimeout(() => {
    //   ref.measureInWindow((x, y) => {
    //     this.detailModal.hideModal({ x, y });
    //   });
    // }, 0);
  };

  _onSearchPress = () => {
    this.searchModal.setModalVisible(true);
  };

  _onDirectionBackPress = (locationItem) => {
    this._clearLocationItem(locationItem);
    this.mapView.clearDirection();
    this._showDirectionHeader();
  };

  _clearLocationItem = (locationItem) => {
    this.mapView.hideCallout(locationItem)
    this.simpleHeader.setLocationItem(null);
    this.directionHeader.setItemLocation(null);
  };

  _startDirection = (fromLocation, toLocation) => {
    if (toLocation) {
      this.mapView.startDirection(fromLocation, toLocation);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <DetailModal
          ref={ref => (this.detailModal = ref)}
          onHide={this._onHideModal}
        /> */}
        <LocationDetailModal
          ref={ref => this.detailModal = ref}
        />
        <SimpleSearchModal ref={ref => (this.searchModal = ref)}/>
        <Map
          ref={ref => (this.mapView = ref)}
          onMapPress={this._onMapPress}
          onMarkerPress={this._onMarkerPress}
          onCalloutPress={this._onCalloutPress}
        />
        <SimpleHeader
          ref={ref => (this.simpleHeader = ref)}
          onDirectionPress={this._showDirectionHeader}
          navigation={this.props.navigation}
          onBackPress={this._clearLocationItem}
          onSearchPress={this._onSearchPress}
        />
        <DirectionHeader
          ref={ref => (this.directionHeader = ref)}
          onDirectionPress={this._showDirectionHeader}
          onStartDirection={this._startDirection}
          onBackPress={this._onDirectionBackPress}
        />
        <View style={styles.containerList}>
          <LocationSmallList
            onItemPress={this._onSmallItemPress}
            onItemLongPress={this._onSmallItemLongPress}
            ref={ref => (this.smallList = ref)}
            locationData={this.props.locationData}
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
