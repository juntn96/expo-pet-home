

import React, { Component } from 'react';
import { View,  Dimensions, FlatList, ScrollView, Platform } from 'react-native';
import { Container, Header, Right, Icon, Button , Left, Body} from 'native-base';
import { Divider, Card, Screen, Image, Subtitle, Caption, TouchableOpacity, Title, Spinner } from '@shoutem/ui';
import { MapCard } from '../DetailCard/index';
import { Rating } from 'react-native-elements';
import LocationServices from '../../../../services/LocationServices';


const { width, height } = Dimensions.get('window');

const locationProduct =  {
  long: 105.883068640442,
  lat: 20.7562527745751,
  name : "Azzan",
  systemRating: 0,
  ownerId: "5bedc434a767a332a4d45ef5",
  typeId: {
      hiddenFlag: false,
      createdAt: 1542302535998,
      updatedAt: 1542302535998,
      _id: "5bedabb2b3c51a06927c35bb",
      name: "Shop đồ thú cưng",
      typeLocation: 2,
  },
  address: "FPT University",
  description: "Nơi họp nhóm mèo con",
  images: [
      {
          _id: "5c016c9aac04f71231be7e2c",
          public_id: "mliywb8odq4tdqekmk8r",
          width: 300,
          height: 250,
          format: "jpg",
          bytes: 18369,
          secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
      },
      {
          _id: "5c016c9aac04f71231be7e2b",
          public_id: "anhbx6su0g1dm5wy7yfa",
          width: 300,
          height: 250,
          format: "jpg",
          bytes: 18369,
          secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/anhbx6su0g1dm5wy7yfa.jpg"
      },
      {
        _id: "5c016c9aac04f71231be7e2q",
        public_id: "mliywb8odq4tdqekmk8q",
        width: 300,
        height: 250,
        format: "jpg",
        bytes: 18369,
        secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
    },
  ],
  products: [
      {
          images: [
              "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
              "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
              "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
          ],
          deletionFlag: false,
          createdAt: 1543846944112,
          updatedAt: 1543846944112,
          _id: "5c053cf8ba0958097cc2f6cc",
          name: "Đồ chơi cho mèo",
          ownerId: "5bedc434a767a332a4d45ef5",
          typeId: "5c00233d27bd8e402c98f791",
          description: "--------",
          price: 120000,
      },
      {
        images: [
            "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
            "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
            "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
        ],
        deletionFlag: false,
        createdAt: 1543846944112,
        updatedAt: 1543846944112,
        _id: "5c053cf8ba0958097cc2f6cq",
        name: "Đồ chơi cho chuột",
        ownerId: "5bedc434a767a332a4d45ef5",
        typeId: "5c00233d27bd8e402c98f791",
        description: "--------",
        price: 130000,
        __v: 0
    },
    {
      images: [
        "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
        "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
        "http://res.cloudinary.com/pet-home-fu/image/upload/v1543847856/rti0ue22srnwmxvjrvev.jpg",
      ],
      deletionFlag: false,
      createdAt: 1543846944112,
      updatedAt: 1543846944112,
      _id: "5c053cf8ba0958097cc2f6cr",
      name: "Đồ chơi cho chó",
      ownerId: "5bedc434a767a332a4d45ef5",
      typeId: "5c00233d27bd8e402c98f791",
      description: "--------",
      price: 140000,
      __v: 0
  }
  ]
}

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
      // this._requestGetLocationDetail();
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

  // _requestGetLocationDetail = async () => {
  //   const { navigation } = this.props;
  //   const _id = navigation.getParam('_id', 'NO-ID');
  //   console.log(_id);
  //   try {
  //     const result = await LocationServices.getLocationDetail({_id: _id});
  //     this.setState({ locationDetail: result , loading: false});
  //   } catch (error) {
  //     throw error;
  //   }
  // };

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
        <Card style={styles.card3}>
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
          <View style={{
                    paddingLeft: 10,
                  }}>
            <Subtitle>{item.name}</Subtitle>
            <View styleName="horizontal v-center space-between">
              <View styleName="horizontal">
                <Caption styleName="md-gutter-right">${item.price}</Caption>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
  

  render() {
    const { loading, locationDetail } = this.state;
    console.log(locationDetail)
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
          <Body>
            <Title>{locationProduct.name}</Title>
          </Body>
          <Right />
        </Header>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <ScrollView>
            {locationProduct.images.length > 0 ? <FlatList
              data={locationProduct.images}
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
                  {locationProduct.description}
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
                  {locationProduct.address}
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>  
            <MapCard lat={locationProduct.lat} long={locationProduct.long}/>
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
                  startingValue={locationProduct.systemRating}
                  imageSize={20}
                  style={{ marginTop:10, paddingRight: 10 }}
                  readonly
                />
              </View>
            </View> 
            
            { locationProduct.products.length > 0 ? <View
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
            { locationProduct.products.length > 0 ? <FlatList
              data={locationProduct.products}
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
  card3:{
    width: height / 3,
    height: height / 3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
  },
};
