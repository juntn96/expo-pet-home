import React, { Component } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import {
  List,
  Left,
  Body,
  Right,
  ListItem,
  Thumbnail,
  Text,
  Icon,
} from "native-base";
import UserServices from "../../../services/UserServices";
import { connect } from "react-redux";


class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  async componentDidMount() {
    try {
      const { userData } = this.props.auth;
      const result = await UserServices.getNotifications(userData._id);
      this.setState({ notifications: result });
    } catch (error) {
      throw error;
    }
  }

  _renderItem = ({ item }) => {
    console.log(item)
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            circular
            source={require("../../../assets/images/bg1.png")}
          />
        </Left>
        <Body>
          <Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {item.from.appName}
            </Text>
            <Text> đã bình luận về bài viết của bạn </Text>
          </Text>
          <Text note>1h</Text>
        </Body>
        <Right>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="ios-more" />
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  };

  render() {
    const { notifications } = this.state;
    return (
      <FlatList
        data={notifications}
        key={item => item._id}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(NotificationList);
