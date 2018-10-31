import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Badge,
} from "native-base";

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
    const { buttonLeft, badgeNumberLeft } = this.props;
    if (!buttonLeft) {
      return null;
    }
    return (
      <Button vertical badge transparent onPress={this._actionLeft} style={{marginLeft: 4}} >
        {badgeNumberLeft ? (
          <Badge
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 16,
              height: 16
            }}
          >
            <Text style={{fontSize: 8, color: '#FFF'}} >{badgeNumberLeft}</Text>
          </Badge>
        ) : null}
        <Icon name={buttonLeft} style={{ color: "#EC466A", fontSize: 26 }} />
      </Button>
    );
  };

  _buttonRight = () => {
    const { buttonRight, badgeNumberRight } = this.props;
    if (!buttonRight) {
      return null;
    }
    return (
      <Button vertical badge transparent onPress={this._actionRight}>
        {badgeNumberRight ? (
          <Badge
            style={{
              position: 'absolute',
              right: 10,
              top: 0,
              height: 16
            }}
          >
            <Text style={{fontSize: 8, color: '#FFF'}} >{badgeNumberRight}</Text>
          </Badge>
        ) : null}
        <Icon name={buttonRight} style={{ color: "#EC466A"}} />
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Left style={{flex: 1}} >{this._buttonLeft()}</Left>
        <Body style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Title style={{ color: "#EC466A", textAlign: "center" }}>
            {title}
          </Title>
        </Body>
        <Right style={{flex: 1}}>{this._buttonRight()}</Right>
      </Header>
    );
  }
}

export default CustomHeader;
