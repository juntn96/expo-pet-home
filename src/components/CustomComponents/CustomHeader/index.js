import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header, Left, Right, Body, Title, Button, Icon } from "native-base";

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _actionLeft = () => {
    const { actionLeft } = this.props;
    if (actionLeft) {
      actionLeft();
    }
  };

  _actionRight = () => {
    const { actionRight } = this.props;
    if (actionRight) {
      actionRight();
    }
  };

  _headerColor = () => {
    const { headerColor } = this.props;
    if (!headerColor) {
      return "transparent";
    }
    return this.props.headerColor;
  };

  _buttonLeft = () => {
    const { buttonLeft } = this.props;
    if (!buttonLeft) {
      return null;
    }
    return (
      <Button transparent onPress={this._actionLeft}>
        <Icon name={buttonLeft} style={{ color: "#EC466A" }} />
      </Button>
    );
  };

  _buttonRight = () => {
    const { buttonRight } = this.props;
    if (!buttonRight) {
      return null;
    }
    return (
      <Button transparent onPress={this._actionRight}>
        <Icon name={buttonRight} style={{ color: "#EC466A" }} />
      </Button>
    );
  };

  render() {
    const { title } = this.props;
    return (
      <Header
        noShadow={true}
        hasTabs={true}
        style={{
          backgroundColor: this._headerColor(),
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          shadowOffset: { height: 0, width: 0 },
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Left>{this._buttonLeft()}</Left>
        <Body>
          <Title style={{ color: "#EC466A", textAlign: 'center' }}>{title}</Title>
        </Body>
        <Right>{this._buttonRight()}</Right>
      </Header>
    );
  }
}

export default CustomHeader;
