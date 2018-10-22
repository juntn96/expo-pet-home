import React, { Component } from 'react'
import { Button } from 'native-base';

import { loginFb } from '../../../services/LoginFacebook'

import { loginFb } from "../../../services/LoginFacebook";

import { login, logout } from "../../../redux/actions/AuthActions";

import { connect } from "react-redux";

class CustomButton extends Component {
  
  _onPress = () => {
    const { data } = this.props;
    if (!data.userData) {
      const userData = await loginFb();
      if (userData) {
        this.props.login(data);
      }
    } else {
      this.props.logout();
    }
  }
  
  render() {
    <Button onPress={this._onPress} >
      {this.props.children}
    </Button>
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
)(CustomButton);
