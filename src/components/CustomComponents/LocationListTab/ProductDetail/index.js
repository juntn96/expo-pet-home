import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, FlatList, ScrollView } from 'react-native';
import { Container, Header, Icon, Button, Right , Left} from 'native-base';
import { Divider, Card, Screen, Image, Subtitle, Caption, TouchableOpacity, Spinner, Title } from '@shoutem/ui';
import ProductServices from "../../../../services/ProductServices";
import { Constants } from "expo";

const { width, height } = Dimensions.get('window');

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productDetail: {},
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetProduct();
    }
  }

  _requestGetProduct = async () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    try {
      const result = await ProductServices.getProductDetail({
        id: item._id
      });
      this.setState({ productDetail: result , loading: !this.state.loading});
    } catch (error) {
      throw error;
    }
  };

  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _onPress = () => {

  }
  
  _renderProductImage = ({item}) => {
    return  (
      <TouchableOpacity 
        key={item.id} 
        styleName="flexible"
        onPress={this._onPress}
        >
        <Card style={styles.imageProduct}>     
          <Image
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
            source={{uri: item.id}}
            borderRadius='5'
          />   
        </Card>
      </TouchableOpacity>
    );  
  }

  render() {
    const { loading, productDetail } = this.state;
    let images = []
    if(loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#FCFCFC'}}>
          <Spinner/>
        </View>
      );
    }
    if(!productDetail){
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
            <Right />
          </Header>
          <Screen style={{backgroundColor: '#FCFCFC'}}>
            <ScrollView>
              <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#FCFCFC'}}>
                <Subtitle>Không có sản phẩm/dịch vụ này</Subtitle>
              </View>
            </ScrollView>
          </Screen>
        </Container>
      );
    }
    if(productDetail){     
      if(productDetail.images.length > 0){
        images = productDetail.images.map( (index, item) => {
          return {
            id: index, 
            url_image: item
        }});
      }
    }
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
          <View style={styles.nameLocation}>
            <View styleName="horizontal v-center space-between">
              <Subtitle numberOfLines={1}>{productDetail.name}</Subtitle>
            </View>
          </View>
          <Right />
        </Header>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <ScrollView>
            {images.length > 0 ? <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderProductImage}
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
                  {productDetail.description}
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
                source={require('../../../../assets/icons/iconfinder_price_tag.png')}
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
                <Subtitle>Giá</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  {productDetail.price}đ
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
                source={require('../../../../assets/icons/iconfinder_tagging.png')}
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
                <Subtitle>Loại</Subtitle>
                <Caption style={{paddingRight: 10}}>
                  {productDetail.typeId.name}đ
                </Caption>
              </View>
            </View> 
            
          </ScrollView>
        </Screen>
      </Container>
    )
  }
}

const styles = {
  nameLocation: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageProduct: {
    width: height / 4,
    height: height / 4,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
  },
};
