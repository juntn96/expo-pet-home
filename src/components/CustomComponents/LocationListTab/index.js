import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform, FlatList, ScrollView } from 'react-native';
import { Container, Header, Text } from 'native-base';
import { Card, Screen, Image, Subtitle, TouchableOpacity, Caption } from '@shoutem/ui';
import { Rating } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
class LocationListTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      showCancel: false
    };
  }

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

  _onPress = () => {
    this.props.navigation.navigate("LocationDetail");
  }

  _renderItem = item => (
    <TouchableOpacity 
      key={item} 
      styleName="flexible"
      onPress={this._onPress}
      >
      <Card style={styles.card3}>
        <View style={{
          width: width * 0.75,
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
          height: 100
        }}>
          <Subtitle numberOfLines={3}>Công viên, địa điểm công cộng</Subtitle>
          <View styleName="horizontal">
              <Caption styleName="collapsible" numberOfLines={2}>{"Công viên, địa điểm công cộng"}</Caption>
            </View>
          <Rating
            type="star"
            startingValue={3.6}
            imageSize={10}
            style={{ paddingVertical: 10 }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  render() {
    console.disableYellowBox = true; 
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
                color: '#767676',
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
              color: '#767676',
              fontSize: 30,
              fontFamily: 'OpenSans-Bold'
            }}>Địa điểm nổi bật:</Text>

            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this._renderItem}
              horizontal
              style={{ marginBottom: 60}}
            />  
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
  },
  card2: {
    width: (width - 28)/2,
    height: height / 3,
    marginTop: 10,
    marginLeft: 4,
    borderRadius: 5,
  },
  card3:{
    width: width * 0.75,
    height: height / 3 + 50,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
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
  }
};

export default LocationListTab;
