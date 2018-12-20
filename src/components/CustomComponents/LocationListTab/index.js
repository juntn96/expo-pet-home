import React, { Component } from 'react';
import { View, TextInput, Dimensions, FlatList, ScrollView, Platform, RefreshControl } from 'react-native';
import { Container, Header, Text } from 'native-base';
import { Card, Screen, Image, Subtitle, TouchableOpacity, Caption, Spinner } from '@shoutem/ui';
import { Rating } from 'react-native-elements';
import LocationServices from '../../../services/LocationServices';

const listLocation = [
  {
    _id : "5bec5615a9f642048071e793",
    name : "Azzan",
    long: 105.883068640442,
    lat: 20.7562527745751,
    systemRating: 1,
    ownerId: "5bedc434a767a332a4d45ef5",
    address: "FPT University",
    description: "Nơi họp nhóm mèo con",
    images: [
        {
            public_id: "mliywb8odq4tdqekmk8r",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
        },
        {
            public_id: "anhbx6su0g1dm5wy7yfa",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/anhbx6su0g1dm5wy7yfa.jpg"
        },
        {
          public_id: "mliywb8odq4tdqekmk8q",
          width: 300,
          height: 250,
          format: "jpg",
          bytes: 18369,
          secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
      },
    ],
  },
  {
    _id : "5bec5615a9f642048071e794",
    name : "Simdo",
    long: 105.883068640442,
    lat: 20.7562527745751,
    systemRating: 2,
    ownerId: "5bedc434a767a332a4d45ef5",
    address: "Tân xã",
    description: "Công viên tân xã",
    images: [
        {
            public_id: "mliywb8odq4tdqekmk8r1",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
        },
        {
            public_id: "anhbx6su0g1dm5wy7yfa2",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/anhbx6su0g1dm5wy7yfa.jpg"
        },
        {
          public_id: "mliywb8odq4tdqekmk8q3",
          width: 300,
          height: 250,
          format: "jpg",
          bytes: 18369,
          secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
      },
    ],
  },
  {
    _id : "5bec5615a9f642048071e795",
    name : "Azzan",
    long: 105.883068640442,
    lat: 20.7562527745751,
    systemRating: 3,
    ownerId: "5bedc434a767a332a4d45ef5",
    address: "Fsoft hòa lạc",
    description: "Shop thú cưng",
    images: [
        {
            public_id: "mliywb8odq4tdqekmk8r4",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
        },
        {
            public_id: "anhbx6su0g1dm5wy7yfa5",
            width: 300,
            height: 250,
            format: "jpg",
            bytes: 18369,
            secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/anhbx6su0g1dm5wy7yfa.jpg"
        },
        {
          public_id: "mliywb8odq4tdqekmk8q6",
          width: 300,
          height: 250,
          format: "jpg",
          bytes: 18369,
          secure_url: "https://res.cloudinary.com/pet-home-fu/image/upload/v1543597350/mliywb8odq4tdqekmk8r.jpg"
      },
    ],
  },
]

const { width, height } = Dimensions.get('window');
class LocationListTab extends Component {
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

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetLocation();
    }
  }

  _requestGetLocation = async () => {
    try {
      const result = await LocationServices.getSuggestLocation();
      this.setState({ 
        listSuggestLocation: result , 
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      throw error;
    }
  };

  _onChangeText = text => {
    this.setState({textSearch: text});
  };

  _onBlur = () => {
    this.setState({showCancel: !this.state.showCancel});
  }

  _onFocus = () => {
    this.setState({showCancel: !this.state.showCancel});
  }
  
  _onSearch = () => {
    this.props.navigation.navigate('SearchLocation', {
      textSearch: this.state.textSearch,
    });
  }

  _onPress = (item) => {
    this.props.navigation.navigate("LocationDetail", {
      _id: item._id,
      ownerId: item.ownerId
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._requestGetLocation();
  }

  _renderItem = ({item}) => (
    <TouchableOpacity 
      key={item._id} 
      styleName="flexible"
      onPress={() => this._onPress(item)}
      >
      <Card style={styles.card3}>
        <View style={{
          width: width * 0.75,
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
            source={require('../../../assets/images/iconfinder_image_default.png')}
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

  render() {
    console.disableYellowBox = true; 
    const { loading, listSuggestLocation } = this.state;
    if (listSuggestLocation.length === 0) {
      return (
        <Container>
          <Screen style={{backgroundColor: '#FCFCFC'}}>
            <Header
              transparent
              style={{
                marginTop: 10,
              }}
            >            
              <View  
                style={{
                  flex: 1,
                  flexDirection: 'row'
                }}>
                <View
                  style={styles.searchBar}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginLeft: 20,
                    }}
                  >
                    <TextInput
                      placeholder="Tìm kiếm địa điểm"
                      clearButtonMode={"while-editing"}
                      underlineColorAndroid="transparent"
                      numberOfLines={1}
                      style={{
                        borderBottomWidth: 0,
                        flex: 1,
                        fontFamily:"OpenSans-Bold"                     
                      }}                   
                      returnKeyLabel="Tìm"
                      returnKeyType="search"
                      placeholderTextColor={'#A4A4A4'}
                      onSubmitEditing={this._onSearch}
                      onChangeText={this._onChangeText}
                      onBlur={this._onBlur}
                      onFocus={this._onFocus}
                    />
                  </View>
                </View>
                { this.state.showCancel ? <TouchableOpacity 
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    justifyContent: 'center',
                  }}
                  onPress={this._onBlur}
                  >
                  <Text style={{
                    fontFamily:"OpenSans-Bold"                     
                  }}>Hủy</Text>
                </TouchableOpacity> : null}
                    
              </View>
            </Header>
            <ScrollView styleName="light">
              <Text style={{
                  marginLeft: 8, 
                  marginTop: 30, 
                  marginBottom: 15,
                  color: '#444444',
                  fontSize: 30,
                  fontFamily: 'OpenSans-Bold'
                }}>Chúng tôi có thể giúp gì bạn?</Text>
              <View style={{
                flexDirection: 'row'
              }}>
                <TouchableOpacity styleName="flexible">
                <Card style={styles.card1}>
                  <View style={{
                      width: (width - 28)/2,
                      height: height / 3 - 50
                    }}>
                    <Image
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                      }}
                      source={require('../../../assets/images/park.jpg')}
                      borderRadius='5'
                    />
                  </View>
                  <View style={{
                    paddingLeft: 10,
                    height: 50
                  }}>
                    <Subtitle>Công viên, địa điểm công cộng</Subtitle>
                  </View>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity styleName="flexible">
                  <Card style={styles.card2}>
                    <View style={{
                        width: (width - 28)/2,
                        height: height / 3 - 50
                      }}>
                      <Image
                        style={{
                          flex: 1,
                          alignSelf: 'stretch',
                          width: undefined,
                          height: undefined
                        }}
                        source={require('../../../assets/images/pet-store.jpg')}
                        borderRadius='5'
                      />
                    </View>
                    <View style={{                  
                      paddingLeft: 10,
                      height: 50
                    }}>
                      <Subtitle>Shop thú cưng, dịch vụ</Subtitle>
                    </View>
                  </Card>
                </TouchableOpacity>
              </View>   

              <Text style={{
                marginLeft: 8, 
                marginTop: 30, 
                marginBottom: 15,
                color: '#444444',
                fontSize: 30,
                fontFamily: 'OpenSans-Bold'
              }}>Địa điểm nổi bật:</Text>
              <View style={styles.background}>
                <Text>Không có dữ liệu</Text>
              </View>
            </ScrollView>   
          </Screen>     
        </Container>      
      );
    }
    return (
      <Container>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >            
            <View  
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <View
                style={styles.searchBar}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <TextInput
                    placeholder="Tìm kiếm địa điểm"
                    clearButtonMode={"while-editing"}
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    style={{
                      borderBottomWidth: 0,
                      flex: 1,
                      fontFamily:"OpenSans-Bold"                     
                    }}                   
                    returnKeyLabel="Tìm"
                    returnKeyType="search"
                    placeholderTextColor={'#A4A4A4'}
                    onSubmitEditing={this._onSearch}
                    onChangeText={this._onChangeText}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                  />
                </View>
              </View>
              { this.state.showCancel ? <TouchableOpacity 
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                onPress={this._onBlur}
                >
                <Text style={{
                  fontFamily:"OpenSans-Bold"                     
                }}>Hủy</Text>
              </TouchableOpacity> : null}
                   
            </View>
          </Header>
          <ScrollView 
            styleName="light" 
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <Text style={{
                marginLeft: 8, 
                marginTop: 30, 
                marginBottom: 15,
                color: '#444444',
                fontSize: 30,
                fontFamily: 'OpenSans-Bold'
              }}>Chúng tôi có thể giúp gì bạn?</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <TouchableOpacity styleName="flexible">
              <Card style={styles.card1}>
                <View style={{
                    width: (width - 28)/2,
                    height: height / 3 - 50
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      width: undefined,
                      height: undefined
                    }}
                    source={require('../../../assets/images/park.jpg')}
                    borderRadius='5'
                  />
                </View>
                <View style={{
                  paddingLeft: 10,
                  height: 50
                }}>
                  <Subtitle>Công viên, địa điểm công cộng</Subtitle>
                </View>
              </Card>
              </TouchableOpacity>
              <TouchableOpacity styleName="flexible">
                <Card style={styles.card2}>
                  <View style={{
                      width: (width - 28)/2,
                      height: height / 3 - 50
                    }}>
                    <Image
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                      }}
                      source={require('../../../assets/images/pet-store.jpg')}
                      borderRadius='5'
                    />
                  </View>
                  <View style={{                  
                    paddingLeft: 10,
                    height: 50
                  }}>
                    <Subtitle>Shop thú cưng, dịch vụ</Subtitle>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>   

            <Text style={{
              marginLeft: 8, 
              marginTop: 30, 
              marginBottom: 15,
              color: '#444444',
              fontSize: 30,
              fontFamily: 'OpenSans-Bold'
            }}>Địa điểm nổi bật:</Text>
            { loading === true ? 
              <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                <Spinner/>
              </View> :
              <FlatList
                data={listSuggestLocation}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderItem}
                horizontal
                style={{ marginBottom: 60}}
              /> }
          </ScrollView>   
        </Screen>       
      </Container>
    );
  }
}

const styles = {
  card1: {
    width: (width - 28)/2,
    height: height / 3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
    borderColor: '#A3A3A3',
    borderWidth: 0.5,
  },
  card2: {
    width: (width - 28)/2,
    height: height / 3,
    marginTop: 10,
    marginLeft: 4,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
    borderColor: '#A3A3A3',
    borderWidth: 0.5,
  },
  card3:{
    width: width * 0.75,
    height: height / 3 + 50,
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: '#FCFCFC',
    borderColor: '#A3A3A3',
    borderWidth: 0.5,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    marginLeft: 2,
    borderRadius: 5,
    shadowColor: "#CACACA",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    address: {
      marginRight: 20
    }
  }
};

export default LocationListTab;
