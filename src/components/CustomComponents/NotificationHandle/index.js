import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Thumbnail } from "native-base";
import { Notifications } from "expo";
import { connect } from "react-redux";
import UserServices from "../../../services/UserServices";
import {
  pushNotification,
  clearNotification,
} from "../../../redux/actions/NotificationActions";

const animatedValue = new Animated.Value(1);

class NotificationHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRender: false,
    };
    this.notificationListener = Notifications.addListener(
      this._notificationHandle
    );
  }

  _hide = duration => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => this.setState({ canRender: false }));
  };

  _notificationHandle = async notification => {
    try {
      console.log(notification);
      const { userData } = this.props;
      const sender = await this._getSender(notification.data.sender);
      this.props.pushNotification(notification.data);
      this.setState({ canRender: true });
      if (sender._id !== userData._id) {
        //check don't send notification myself
      }
    } catch (error) {
      throw error;
    }
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
    const { notification } = this.props;

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    if (this.state.canRender === false) return null;

    if (!notification) return null;

    this._hide(3000);

    return (
      <Animated.View style={[styles.container, { opacity: animOpacity }]}>
        <View style={styles.body}>
          <Text>{` ${notification.message}`}</Text>
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

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    notification: state.notification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushNotification: notification => {
      dispatch(pushNotification(notification));
    },
    clearNotification: () => {
      dispatch(clearNotification());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationHandle);
