import React, { Component } from "react";
import { markerType } from "../../../../utils/fakeData";
import { Text, ListItem, Thumbnail, Left, Body } from "native-base";


class DestinationLocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { item } = this.props

    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail small square source={markerType[item.type].thumbnail} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>Hòa Lạc, Thạch Thất, Hà Nội</Text>
        </Body>
      </ListItem>
    );
  }
}

export default DestinationLocationItem;
