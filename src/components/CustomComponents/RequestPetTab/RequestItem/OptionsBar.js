import React, { Component } from "react";
import { View, FlatList, Dimensions, Image, SectionList } from "react-native";
import { Button, Text } from "native-base";

class OptionsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _buttonBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingRight: 50,
          }}
        >
          <Button small danger block>
            <Text>Từ chối</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 50,
          }}
        >
          <Button small success block>
            <Text>Chấp nhận</Text>
          </Button>
        </View>
      </View>
    );
  };

  _statusBar = () => {
    const { userData, item } = this.props;
    const status = item.content.status;
    if (status === "pending") {
      return this._statusPending();
    }
    if (status === "accept") {
      return this._statusAccept();
    }
    if (status === "decline") {
      return this._statusDecline();
    }
  };

  _statusPending = () => {
    return (
      <View
        style={{
          paddingTop: 6,
        }}
      >
        <Text
          style={{ color: "#f1c40f", fontSize: 12 }}
        >{`Hãy đợi phản hồi từ chủ sở hữu Pet`}</Text>
        ;
      </View>
    );
  };

  _statusAccept = () => {
    return (
      <View
        style={{
          paddingTop: 6,
        }}
      >
        <Text>
          <Text style={{ color: "#2ecc71", fontSize: 12 }}>
            Lời mời đã được chấp nhận.{" "}
          </Text>
          <Text style={{ fontWeight: "bold", color: "#2ecc71", fontSize: 13 }}>
            Liên lạc ngay nào
          </Text>
        </Text>
      </View>
    );
  };

  _statusDecline = () => {
    return (
      <View
        style={{
          paddingTop: 6,
        }}
      >
        <Text
          style={{ color: "#e74c3c", fontSize: 12 }}
        >{`Lời mời đã bị từ chối`}</Text>
        ;
      </View>
    );
  };

  render() {
    const { userData, item } = this.props;

    if (userData._id === item.sender._id) {
      return this._statusBar();
    }

    return this._buttonBar();
  }
}

export default OptionsBar;
