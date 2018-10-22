import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

import { loginFb } from "../../../services/LoginFacebook";

import { login, logout } from "../../../redux/actions/AuthActions";

import { connect } from "react-redux";

class CustomTouchable extends Component {
  _onPress = async () => {
    const { data } = this.props;
    if (!data.userData) {
      const userData = await loginFb();
      if (userData) {
        this.props.login(data);
      }
    } else {
      this.props.logout();
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      dispatch(login(userData));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTouchable);
