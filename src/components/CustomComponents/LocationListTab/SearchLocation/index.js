import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform, FlatList, ScrollView, Keyboard } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Left, Body } from 'native-base';
import { Card, DropDownMenu, Examples, Screen, Image, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui';
import Layout from '../../../../constants/layout';
import LocationList from '../LocationList'
const { width, height } = Dimensions.get('window');
class SearchLocation extends Component {
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
    console.log("_onBlur")
  }

  _onFocus = () => {
    this.setState({showCancel: !this.state.showCancel});
    console.log("_onFocus")
  }

  _onSearch = () => {

  }

  _dismissKeyboard = () => {
    Keyboard.dismiss();
    console.log("_dismissKeyboard")
  }

  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    console.disableYellowBox = true; 
    let defaultListProps = {
      key: 'list',
      setRef: view => {
        this._list = view;
      },
      contentContainerStyle: { paddingTop: Layout.HEADER_HEIGHT },
    };
    const { navigation } = this.props;
    const textSearch = navigation.getParam('textSearch', 'NO-ID');
    return (
      <Container>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >    
            <Button 
              onPress={this._onBack}
              transparent              
              >
              <Icon name='arrow-back' style={{marginLeft: 0, marginRight: 10}}/>
            </Button>
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
                    onSubmitEditing={this._onSearch}
                    onChangeText={this._onChangeText}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                    value={textSearch}
                  />
                </View>
              </View>
              { this.state.showCancel ? <TouchableOpacity 
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                onPress={this._dismissKeyboard}
                >
                <Text style={{
                  fontFamily:"OpenSans-Bold"                     
                }}>Hủy</Text>
              </TouchableOpacity> : null}
                   
            </View> 
          </Header>
          <LocationList {...defaultListProps} navigation={this.props.navigation}/>   
        </Screen>       
      </Container>
    );
  }
}

const styles = {
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

export default SearchLocation;