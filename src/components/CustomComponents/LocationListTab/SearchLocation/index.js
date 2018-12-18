import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform, FlatList, ScrollView, Keyboard } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Left, Body } from 'native-base';
import { Card, DropDownMenu, Examples, Screen, Image, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui';
import LocationList from '../LocationList';
import FilterModal from '../FilterModal';
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

  }

  _onSearch = () => {

  }

  _onShowFilter = () => {

  }
  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    console.disableYellowBox = true; 
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
            
            <View  
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <View
                style={styles.searchBar}
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
              <TouchableOpacity 
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                onPress={() => this.filterModal.setVisibleModal(true)}
                >
                <Image 
                  source={require('../../../../assets/icons/icons8-filter.png')}
                  style={{ 
                    width: 25,
                    height: 25
                    }}/>
              </TouchableOpacity>                   
            </View> 
          </Header>
          <LocationList navigation={this.props.navigation}/>   
        </Screen>
        <FilterModal ref={ref => (this.filterModal = ref)} />       
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