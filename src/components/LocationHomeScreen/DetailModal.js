import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import { Button, Icon, List } from "native-base";
import TagList from "../CustomComponents/TagList";

const data = [1, 2, 3, 4, 5];

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedTrans: new Animated.ValueXY({ x: 10000, y: -10000 }),
    };
  }

  showModal = curPos => {
    this.state.animatedTrans.setValue({
      x: curPos.x,
      y: curPos.y,
    });
    this.setState({
      modalVisible: true,
    });
    Animated.timing(this.state.animatedTrans, {
      toValue: { x: 0, y: Dimensions.get('window').height / 3 + 20 },
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  hideModal = curPos => {
    console.log(curPos)
    Animated.timing(this.state.animatedTrans, {
      toValue: { x: curPos.x, y: curPos.y },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        modalVisible: false,
      });
    });
  };

  _renderItem = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").height / 3,
          height: Dimensions.get("window").height / 3,
          backgroundColor: "#CA9DF7",
          borderWidth: 2,
        }}
      />
    );
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="none"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingTop: 20,
          }}
        >
          <View>
            <List
              dataArray={data}
              horizontal
              renderRow={() => this._renderItem()}
            />
          </View>
          <Button
            transparent
            onPress={() => {
              this.props.onHide();
            }}
            style={{
              position: "absolute",
              top: 25,
            }}
          >
            <Icon name="md-close" style={{ color: "#EC466A" }} />
          </Button>
          <TouchableOpacity
            ref={ref => (this.locItem = ref)}
            style={{
              
              borderRadius: 10,
              width: 229,
              height: 55.5,
              transform: [...this.state.animatedTrans.getTranslateTransform()],
              position: "absolute",
              justifyContent: 'center',
              padding: 10,
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
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default DetailModal;
