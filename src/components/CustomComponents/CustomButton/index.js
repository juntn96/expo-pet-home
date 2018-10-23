import React, { Component } from "react";
import { Button } from "native-base";

import { loginFb } from "../../../services/LoginFacebook";

import { login, logout } from "../../../redux/actions/AuthActions";

import { connect } from "react-redux";

import PropTypes from "prop-types";

class CustomButton extends Component {
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
      <Button onPress={this._onPress} {...this.props}>
        {this.props.children}
      </Button>
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

CustomButton.propTypes = {
  loginRequired: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomButton);
