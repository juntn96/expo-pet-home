import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "native-base";
import CustomTouchable from "../CustomTouchable";

import { connect } from "react-redux";
import { logout } from "../../../redux/actions/AuthActions";

class CustomDrawer extends Component {
  _onPressProfile = () => {
    this.props.navigation.navigate("ProfileRoute");
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomTouchable
          loginRequired={true}
          onCustomPress={this._onPressProfile}
          activeOpacity={0.7}
          style={styles.profile}
        >
          <Icon name="ios-settings-outline" style={styles.icon} />
        </CustomTouchable>
        <View style={styles.body}>
          <CustomTouchable loginRequired={false} style={styles.buttonBody}>
            <Icon
              onPress={() => {
                this.props.navigation.navigate("HomeRoute");
              }}
              name="ios-home-outline"
              style={styles.iconBody}
            />
          </CustomTouchable>
          <CustomTouchable loginRequired={false} style={styles.buttonBody}>
            <Icon
              onPress={() => {
                this.props.navigation.navigate("LocationRoute");
              }}
              name="ios-map-outline"
              style={styles.iconBody}
            />
          </CustomTouchable>
          <CustomTouchable loginRequired={true} style={styles.buttonBody}>
            <Icon name="ios-heart-outline" style={styles.iconBody} />
          </CustomTouchable>
          <CustomTouchable loginRequired={true} style={styles.buttonBody}>
            <Icon name="ios-notifications-outline" style={styles.iconBody} />
          </CustomTouchable>
          <CustomTouchable loginRequired={true} style={styles.buttonBody}>
            <Icon name="ios-chatbubbles-outline" style={styles.iconBody} />
          </CustomTouchable>
          <CustomTouchable loginRequired={true} style={styles.buttonBody}>
            <Icon name="ios-bookmark-outline" style={styles.iconBody} />
          </CustomTouchable>
        </View>
        <View style={styles.under}>
          {this.props.data.userData ? (
            <CustomTouchable
              loginRequired={false}
              style={styles.buttonBody}
              onPress={() => {
                this.props.logout();
                this.props.navigation.navigate('HomeRoute')
              }}
            >
              <Icon name="md-log-out" style={styles.icon} />
            </CustomTouchable>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width / 3.5,
    backgroundColor: "#FFF",
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#B5B5B5",
  },
  body: {
    flex: 4,
    alignItems: "center",
  },
  buttonBody: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconBody: {
    color: "#B5B5B5",
    marginBottom: 10,
    marginTop: 10,
  },
  under: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
