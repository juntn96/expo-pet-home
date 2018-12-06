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
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail circular source={{ uri: item.sender.avatar }} />
        </Left>
        <Body>
          <Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {item.sender.appName}
            </Text>
            <Text> {item.message} </Text>
          </Text>
          <Text note style={{fontSize: 10}} >{new Date(item.createdAt).toLocaleTimeString()}</Text>
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
        keyExtractor={item => item._id}
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
