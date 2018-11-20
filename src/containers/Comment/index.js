import React, { Component } from "react";
import { View, Text } from "react-native";
import CommentScreen from "../../components/CommentScreen";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/UIActions";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CommentScreen
        navigation={this.props.navigation}
        userData={this.props.data.userData}
        toast={this.props.toast}
      />
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
    toast: toast => {
      dispatch(toggle(toast));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
