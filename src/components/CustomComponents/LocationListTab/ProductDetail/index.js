import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform, FlatList, ScrollView } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text , Left} from 'native-base';
import { Divider, Card, DropDownMenu, Examples, Screen, Image, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui';

const { width, height } = Dimensions.get('window');

export default class ProductDetail extends Component {
  _onBack = () => {
    this.props.navigation.goBack(null);
  }
  
  render() {
    return (
      <Container>
        <Header
          transparent
          style={{
            marginTop: 10,
          }}
        >            
          <Left>
            <Button 
              onPress={this._onBack}
              transparent >
              <Icon name='arrow-back' />
            </Button>
          </Left>
        </Header>
      </Container>
    )
  }
}