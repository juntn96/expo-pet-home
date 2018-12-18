import React, { Component } from "react";
import { View, FlatList, Modal, Dimensions, Image, Text } from "react-native";
import PetServices from "../../../services/PetServices";
import CustomHeader from "../CustomHeader";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      petInfo: undefined,
    };
  }

  setModalVisible = (modalVisible, petId) => {
    this.setState({ modalVisible });
    if (petId) {
      this._requestGetInfo(petId);
    }
    else {
      this.setState({petInfo: undefined})
    }
  };

  _requestGetInfo = async petId => {
    try {
      const info = await PetServices.getPetById(petId);
      this.setState({ petInfo: info });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { petInfo } = this.state;

    return (
      <Modal
        transparent={false}
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
          }}
        >
          <CustomHeader
            title=""
            buttonLeft="md-close"
            actionLeft={() => {
              this.setModalVisible(false);
            }}
          />
          {this.state.petInfo ? (
            <FlatList
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
              data={petInfo.images}
              keyExtractor={item => item._id}
              horizontal
              pagingEnabled
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : null}
          {this.state.petInfo ? (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                backgroundColor: "#00000090",
                justifyContent: "center",
                paddingLeft: 10, 
                paddingRight: 10,
                paddingTop: 30,
                paddingBottom: 30
              }}
            >
              <Text>
                <Text style={{ fontWeight: "bold", color: "#FFF" }}>
                  {petInfo.name}
                </Text>
                <Text
                  style={{
                    color: "#FFF",
                  }}
                >
                  {`: loài ${petInfo.breed}, giới tính ${
                    petInfo.gender
                  }, giống ${petInfo.branch}, ${petInfo.age} tuổi `}
                </Text>
              </Text>
            </View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

export default InfoModal;
