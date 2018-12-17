

import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform, FlatList, ScrollView } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text , Left} from 'native-base';
import { Divider, Card, DropDownMenu, Examples, Screen, Image, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui';
import { MapCard } from '../DetailCard/index'
const { width, height } = Dimensions.get('window');

export default class LocationDetail extends Component {
  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _onPressProduct = () => {
    this.props.navigation.navigate("ProductDetail");
  }

  _renderItem = item => (
    <TouchableOpacity 
      key={item} 
      styleName="flexible"
      onPress={this._onPress}
      >
      <Card style={styles.card3}>
        <Image
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: undefined,
            height: undefined
          }}
          source={{uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'}}
          borderRadius='5'
        />
      </Card>
    </TouchableOpacity>
  );

  _renderProduct = item => (
    <TouchableOpacity 
      key={item} 
      styleName="flexible"
      onPress={this._onPressProduct}
      >
      <Card style={styles.card3}>
        <Image
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: undefined,
            height: undefined,
          }}
          source={{uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'}}
          borderRadius='5'
        />
        <View style={{
                  paddingLeft: 10,
                }}>
          <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
          <View styleName="horizontal v-center space-between">
            <View styleName="horizontal">
              <Subtitle styleName="md-gutter-right">$99.99</Subtitle>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )

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
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <ScrollView>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderItem}
              horizontal
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                padding: 10,
              }}>
              <Image 
                source={require('../../../../assets/icons/iconfinder_info.png')}
                style={{ 
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25
                  }}/>
              <View style={{
                marginRight: 10, 
                paddingRight: 60, 
                }}>
                <Subtitle>The Right Boutique Hotel</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>  
            
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                padding: 10,
              }}>
              <Image 
                source={require('../../../../assets/icons/iconfinder_thefreeforty_location.png')}
                style={{ 
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25
                  }}/>
              <View style={{
                marginRight: 10, 
                paddingRight: 60, 
                }}>
                <Subtitle>The Right Boutique Hotel</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>  
            
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                padding: 10,
              }}>
              <Image 
                source={require('../../../../assets/icons/iconfinder_ic_stars.png')}
                style={{ 
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25
                  }}/>
              <View style={{
                marginRight: 10, 
                paddingRight: 60, 
                }}>
                <Subtitle>The Right Boutique Hotel</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                </Caption>
              </View>
            </View> 
            <MapCard />
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderProduct}
              horizontal
              style={{marginBottom: 20}}
            /> 
          </ScrollView>
        </Screen>
      </Container>
    )
  }
}

const styles = {
  card3:{
    width: height / 3,
    height: height / 3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
  },
};
