import React, { Component } from "react";
import { View, Text } from "react-native";
import MessageServices from "../../../services/MessageServices";

import { connect } from "react-redux";
import { initSocket } from "../../../redux/actions/SocketActions";
import { toggle } from "../../../redux/actions/UIActions";
import { logout } from "../../../redux/actions/AuthActions";

class SocketHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.initSocket();
  }

  _subscribe = () => {
    const { socket, userData, toast, logout } = this.props;
    if (!userData) return;
    socket.on("banUser", user => {
      if (user.id === userData._id && user.deletionFlag === true) {
        toast({
          message:
            "Tài khoản đã bị cấm. Vui lòng liên hệ quản trị viên để biết thêm chi tiết",
          duration: 5000,
        });
        logout();
      }
    });
  };

  render() {
    const { socket } = this.props;
    if (socket) {
      this._subscribe();
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: () => {
      dispatch(initSocket());
    },
    toast: toast => {
      dispatch(toggle(toast));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketHandle);
