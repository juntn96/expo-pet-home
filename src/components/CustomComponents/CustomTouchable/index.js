import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from 'prop-types'

import { loginFb } from "../../../services/LoginFacebook";

import { login, logout } from "../../../redux/actions/AuthActions";

import { connect } from "react-redux";

class CustomTouchable extends Component {
  
  _onPress = async () => {
    const { data, onCustomPress, login, loginRequired } = this.props;
    if (!data.userData && loginRequired) {
      const userData = await loginFb();
      if (userData) {
        login(userData);
      }
    } else {
      if (onCustomPress) {
        onCustomPress();
      }
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

CustomTouchable.propTypes = {
  loginRequired: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTouchable);
