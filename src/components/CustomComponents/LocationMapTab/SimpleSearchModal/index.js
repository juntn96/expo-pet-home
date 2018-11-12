import React, { Component } from "react";
import { View, Modal, TextInput } from "react-native";
import { Header, Icon, Button, Container, Content } from "native-base";
import FilterModal from "../FilterModal";
import LocationList from "./LocationList";
import { GoogleMap } from "../../../../services/Map";
import { locationData } from "../../../../utils/fakeData";

class SimpleSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchQuery: "",
      locationData: [],
    };
  }

  setModalVisible = (visible, searchType) => {
    this.searchType = searchType;
    if (visible) {
      this.setState(
        {
          modalVisible: visible,
          locationData: searchType === "start" ? [] : locationData,
        },
        () => {
          this.LocationList.show(searchType);
        }
      );
    } else {
      this.setState({
        modalVisible: visible,
      });
    }
  };

  _onSearchQueryChange = text => {
    if (this.searchWaiting) {
      clearTimeout(this.searchWaiting);
    }
    this.searchWaiting = setTimeout(() => {
      this.searchWaiting = null;
      const { userLocation } = this.props;
      if (this.searchType === "start") {
        this._searchStartLocation(text, userLocation);
      }
      if (this.searchType === "destination") {
        this._searchDestinationLocation(text, userLocation);
      }
    }, 200);
  };

  _searchStartLocation = async (text, nearby) => {
    const results = await GoogleMap.searchLocation(text, nearby);
    if (results) {
      this.setState({
        locationData: results,
      });
    }
  };

  _searchDestinationLocation = (text, nearby) => {
    console.log("destination: ", text, nearby);
  };

  _onSelectLocation = (location, searchType) => {
    console.log(location, searchType);
    const { onLocationChange } = this.props
    if (onLocationChange) {
      onLocationChange(location, searchType)
    }
    this.setModalVisible(false)
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Container>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#B5B5B5",
                borderRadius: 5,
              }}
            >
              <Button
                transparent
                iconRight
                onPress={() => this.setModalVisible(false)}
              >
                <Icon
                  name="ios-arrow-back-outline"
                  style={{ color: "#EC466A" }}
                />
              </Button>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Tìm kiếm"
                  underlineColorAndroid="transparent"
                  numberOfLines={1}
                  style={{
                    borderBottomWidth: 0,
                  }}
                  onChangeText={this._onSearchQueryChange}
                />
              </View>
              <Button
                transparent
                iconLeft
                onPress={() => this.filterModal.setVisibleModal(true)}
              >
                <Icon name="md-options" style={{ color: "#EC466A" }} />
              </Button>
            </View>
          </Header>
          <Content>
            <LocationList
              ref={ref => (this.LocationList = ref)}
              locationData={this.state.locationData}
              onItemPress={this._onSelectLocation}
            />
          </Content>
        </Container>
        <FilterModal ref={ref => (this.filterModal = ref)} />
      </Modal>
    );
  }
}

export default SimpleSearchModal;
