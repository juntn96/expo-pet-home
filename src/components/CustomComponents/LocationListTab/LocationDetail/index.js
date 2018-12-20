

import React, { Component } from 'react';
import { View,  Dimensions, FlatList, ScrollView, Platform, RefreshControl } from 'react-native';
import { Container, Header, Right, Icon, Button , Left, Body} from 'native-base';
import { Divider, Card, Screen, Image, Subtitle, Caption, TouchableOpacity, Title, Spinner } from '@shoutem/ui';
import { MapCard } from '../DetailCard/index';
import { Rating } from 'react-native-elements';
import LocationServices from '../../../../services/LocationServices';


const { width, height } = Dimensions.get('window');
export default class LocationDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locationDetail: {}
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetLocationDetail();
    }
  }

  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _onPressProduct = (item) => {
    this.props.navigation.navigate("ProductDetail", {
      item: item
    });
  }

  _requestGetLocationDetail = async () => {
    const { navigation } = this.props;
    const _id = navigation.getParam('_id', 'NO-ID');
    const ownerId = navigation.getParam('ownerId', 'NO-ID');
    try {
      const result = await LocationServices.getLocationDetail({
        _id: _id,
        ownerId: ownerId
      });
      this.setState({ 
        locationDetail: result , 
        loading: false,
        isFetching: false
      });
    } catch (error) {
      throw error;
    }
  };

  _renderLocationImage = ({item}) => (
    <TouchableOpacity 
      key={item._id} 
      styleName="flexible"
      onPress={this._onPress}
      >
      <Card style={styles.imageLocation}>     
        <Image
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: undefined,
            height: undefined
          }}
          source={{uri: item.secure_url}}
          borderRadius='5'
        />   
      </Card>
    </TouchableOpacity>
  );

  _renderProduct = ({item}) => 
  {
    return (
      <TouchableOpacity 
        key={item._id} 
        styleName="flexible"
        onPress={() => this._onPressProduct(item)}
        >       
          <Card style={styles.cardProduct}>
            <View style={{
              width: height / 3,
              height: height / 3 - 50
            }}> 
              <Image
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  width: undefined,
                  height: undefined,
                }}
                source={{uri: item.images[0]}}
                borderRadius='5'
              />
            </View>      
            <View style={{
              paddingLeft: 10,
              height: 50
            }}>
              <View styleName="horizontal v-center space-between">
                <Subtitle numberOfLines={1}>{item.name}</Subtitle>
              </View>
              <View styleName="horizontal v-center space-between">
                <View styleName="horizontal">
                  <Caption styleName="md-gutter-right">Giá: {item.price}đ</Caption>
                </View>
              </View>
            </View>
          </Card>
      </TouchableOpacity>
    )
  }
  

  render() {
    const { loading, locationDetail } = this.state;
    if(loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#FCFCFC'}}>
          <Spinner/>
        </View>
      )
    }
    return (
      <Container>
        <Header
          transparent
          style={{
            marginTop: 10,
          }}>            
          <Left>
            <Button 
              onPress={this._onBack}
              transparent >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <View style={styles.nameLocation}>
            <Title>{locationDetail.name}</Title>
          </View>
          <Right />
        </Header>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <ScrollView>
            {locationDetail.images.length > 0 ? <FlatList
              data={locationDetail.images}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderLocationImage}
              horizontal
            /> : null}
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
                <Subtitle>Thông tin chi tiết</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  {locationDetail.description}
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
                <Subtitle>Địa chỉ</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  {locationDetail.address}
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>  
            <MapCard lat={locationDetail.lat} long={locationDetail.long} name={locationDetail.name}/>
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
                <Subtitle>Đánh giá</Subtitle>
                <Rating
                  type="star"
                  startingValue={locationDetail.systemRating}
                  imageSize={20}
                  style={{ marginTop:10, paddingRight: 10 }}
                  readonly
                />
              </View>
            </View> 
            
            { locationDetail.products.length > 0 ? <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                padding: 10,
              }}>
              <Image 
                source={require('../../../../assets/icons/iconfinder_price.png')}
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
                <Subtitle>Sản phẩm, dịch vụ</Subtitle>
              </View>
            </View> 
             : null}
            { locationDetail.products.length > 0 ? <FlatList
              data={locationDetail.products}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderProduct}
              horizontal
              style={{marginBottom: 20}}
            /> : null}
            
          </ScrollView>
        </Screen>
      </Container>
    )
  }
}

const styles = {
  imageLocation: {
    width: height / 4,
    height: height / 4,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
  },
  cardProduct:{
    width: height / 3,
    height: height / 3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
  },
  nameLocation: {
    alignItems: 'center',
    justifyContent: 'center'
  }
};
