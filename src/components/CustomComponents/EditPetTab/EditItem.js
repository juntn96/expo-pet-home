import React, { Component } from "react";
import { View } from "react-native";
import {
  Icon,
  Card,
  Thumbnail,
  Text,
  Button,
} from "native-base";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ margin: 10 }}>
            <Thumbnail
              circular
              large
              source={require("../../../assets/images/bg4.png")}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text style={{ flex: 1, marginLeft: 6, marginRight: 6 }}>
                Tên: Kitty
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              >
                Loài: Mèo
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text style={{ flex: 1, marginLeft: 6, marginRight: 6 }}>
                Giống: Tai cụp
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              >
                Giới tính: Cái
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text style={{ flex: 1, marginLeft: 6, marginRight: 6 }}>
                Tuổi: 1
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <Button transparent style={{ marginRight: 10 }}>
                <Icon name="md-create" />
              </Button>
              <Button transparent>
                <Icon name="md-trash" style={{ color: "#EC466A" }} />
              </Button>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

export default EditItem;
