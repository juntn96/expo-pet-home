import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Thumbnail } from "native-base";
import { Notifications } from "expo";
import { connect } from "react-redux";
import UserServices from "../../../services/UserServices";

const animatedValue = new Animated.Value(1);

class NotificationHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: undefined,
    };

    this.notificationListener = Notifications.addListener(
      this._notificationHandle
    );
  }

  componentDidMount() {}

  _hide = duration => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => this.setState({ notification: undefined }));
  };

  _notificationHandle = async notification => {
    console.log(notification);
    const sender = await this._getSender(notification.data.sender);
    this.setState({
      notification: {
        message: notification.data.message,
        sender,
      },
    });
  };

  _getSender = async userId => {
    try {
      const sender = await UserServices.findUser(userId);
      console.log("sender: ", sender);
      return sender;
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { notification } = this.state;

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    if (!notification) return null;

    this._hide(3000);

    return (
      <Animated.View style={[styles.container, { opacity: animOpacity }]}>
        <View style={styles.body}>
          <Text>
            <Text style={styles.name}>{notification.sender.appName}</Text>
            <Text>{` ${notification.message}`}</Text>
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  body: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#B5B5B5",
  },
  name: {
    fontWeight: "bold",
  },
});

export default NotificationHandle;
