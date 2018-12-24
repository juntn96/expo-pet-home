import React, { Component } from 'react';
import { View,  Dimensions, FlatList, ScrollView, Platform, Text } from 'react-native';
import { Container, Header, Right, Icon, Button , Left} from 'native-base';
import { Divider, Screen, Image, TouchableOpacity, Title } from '@shoutem/ui';
import { Rating } from 'react-native-elements';
const { width, height } = Dimensions.get('window');

export default class RatingComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      commentList: []
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetCommentRating();
    }
  }

  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _requestGetCommentRating = async () => {

  }

  _onWriteComment = (data) => {
    console.log(data)
  }

  _renderComment = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FCFCFC",
          padding: 10,
          marginTop: 6,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Image
            style={{width: 40, height: 40, borderRadius: 20}}
            source={{ uri: 'https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/anhbx6su0g1dm5wy7yfa.jpg'}}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{ flex: 1, fontWeight: "500", fontFamily: 'OpenSans-Bold' }}>Td Chien</Text>
            <Text note style={{ fontSize: 12, fontFamily: 'OpenSans-Light' }}>
              11/11/2018
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 14 , marginTop: 12, marginBottom: 12}}>
          Nơi lí tưởng để cho pet đi dạo
        </Text>  
        <Divider styleName="line"/>              
      </View>
    )
  }

  render(){
    const { navigation } = this.props;
    const locationDetail = navigation.getParam('locationDetail', 'NO-ID');
    const { name, systemRating } = locationDetail;
    return (
      <Container>
        <Header
          transparent
          style={{
            marginTop: 10,
            marginLeft: 5
          }}>            
          <Left>
            <Button 
              onPress={this._onBack}
              transparent >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <View style={styles.nameLocation}>
            <Title>{name}</Title>
          </View>
          <Right />
        </Header>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <ScrollView style={{marginLeft: 10}}>
            <View style={{
              height: 90
            }}>
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <Text style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 30,
                  marginTop: 10,
                  marginBottom: 4,
                  marginLeft:10,
                  height: 45
                }}>
                  {"Đánh giá"}
                </Text> 
                <TouchableOpacity     
                  styleName="flexible"
                  onPress={() => this._onWriteComment("jsjs")}
                  style={{borderRadius: 5,
                    borderColor: '#615c70',
                    alignItems: 'flex-end'
                  }}
                  >
                  <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Text 
                      style={{
                        textAlign: 'right', 
                        fontFamily: 'OpenSans-Bold', 
                        marginRight: 10,
                        marginTop: 20,
                      }}>
                        Viết đánh giá
                    </Text>
                    <Icon
                      name="ios-create-outline"
                      style={{ 
                        color: "#00cc99",
                        marginTop: 15,
                        marginRight: 10,
                      }}
                    />
                  </View>
                </TouchableOpacity>          
              </View>             
              <View style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft:10,
                // marginTop: 10,
                alignItems: 'center',
              }}>
                <Rating
                  type="star"
                  startingValue={systemRating}
                  imageSize={20}
                  style={{ 
                    marginTop:10, 
                    paddingRight: 10, 
                    alignItems: 'center',
                    alignSelf: 'center', 
                    backgroundColor: '#FCFCFC',                    
                  }}
                  readonly
                />
                <Text style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 13,
                  marginLeft:2,
                  marginTop: 10,
                  alignItems: 'center',
                }}>27 Đánh giá</Text>
              </View>
            </View>
            {/* { locationDetail.products.length > 0 ?  */}
            <FlatList
              data={[1,2,3,4,5,6]}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderComment}
              style={{marginBottom: 20, flex: 1, marginTop: 10}}
            /> 
            {/* : null} */}
          </ScrollView>
        </Screen>
      </Container> 
    );
  }
}

const styles = {
  nameLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
};