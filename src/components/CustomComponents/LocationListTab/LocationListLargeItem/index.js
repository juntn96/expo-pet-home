import React, { Component } from 'react';
import { View, TextInput, Dimensions, FlatList, ScrollView, Platform, RefreshControl } from 'react-native';
import { Container, Header, Text } from 'native-base';
import { Card, Screen, Image, Subtitle, TouchableOpacity, Caption, Spinner } from '@shoutem/ui';
import { Rating } from 'react-native-elements'; 
const { width, height } = Dimensions.get('window');

export default class LocationListLargeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      showCancel: false,
      loading: true,
      listSuggestLocation: [],
      refreshing: false,
    };
  }

  _onPress = (item) => {
    this.props.onPress();
  }

  render(){
    const item = this.props.item;
    return (
      <TouchableOpacity 
        key={item._id} 
        styleName="flexible"
        onPress={() => this._onPress(item)}
      >
        <Card style={styles.card3}>
          <View style={{
            width: width - 16,
            height: height / 3 - 50
          }}>
            { item.images.length === 0 ?
            <Image
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: undefined,
                height: undefined
              }}
              source={require('../../../../assets/images/iconfinder_image_default.png')}
              borderRadius='5'
            />
            : <Image
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: undefined,
                height: undefined
              }}
              source={{uri: item.images[0].secure_url}}
              borderRadius='5'
            />}
          </View>
          <View style={{
            paddingLeft: 10,
            height: 100
          }}>
            <Subtitle numberOfLines={1}>{item.name}</Subtitle>
            <View styleName="horizontal" >
                <Caption styleName="collapsible" numberOfLines={1} style={styles.address} >{item.address}</Caption>
            </View>
            <Rating
              type="star"
              startingValue={item.systemRating}
              imageSize={10}
              style={{ paddingVertical: 10 }}
              readonly
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  card3:{
    width: width - 16,
    height: height / 3 + 50,
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
  },
};