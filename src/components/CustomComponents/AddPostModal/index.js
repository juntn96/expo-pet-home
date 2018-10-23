import React, { Component } from "react";
import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Container, Content } from "native-base";
import CustomHeader from "../../CustomComponents/CustomHeader";

import CustomTouchable from '../../CustomComponents/CustomTouchable'
import CustomButton from '../../CustomComponents/CustomButton'

import { connect } from "react-redux";

class AddPostModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  _setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { userData } = this.props.data;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Container>
            <CustomHeader
              title="Add Post"
              buttonLeft="md-close"
              buttonRight="md-add"
              actionLeft={() => {
                this._setModalVisible();
              }}
            />
            <Content>
              <View>
                <View
                  style={{
                    height: 50,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 36,
                      overflow: "hidden",
                      backgroundColor: "#FFF",
                      marginLeft: 10,
                      marginRight: 4,
                    }}
                  >
                    {userData ? (
                      <Image
                        style={{
                          width: 36,
                          height: 36,
                        }}
                        source={{
                          uri: userData.picture.data.url,
                        }}
                      />
                    ) : null}
                  </View>
                  <Text style={{ fontWeight: "bold", flex: 1 }}>
                    {userData ? userData.name : ""}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <Icon
                      name="md-settings"
                      style={{ fontSize: 20, color: "#B5B5B5" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Content>
          </Container>
        </Modal>
        <CustomButton loginRequired={true} vertical onCustomPress={this._setModalVisible}>
          <Icon name="ios-add-circle-outline" />
        </CustomButton>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostModal);
