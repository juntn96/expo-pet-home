import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform } from 'react-native';
import { Container, Header, Icon, Button, Spinner } from 'native-base';
import { Text, Screen, Image, TouchableOpacity } from '@shoutem/ui';
import LocationList from '../LocationList';
import FilterModal from '../FilterModal';
import LocationServices from "../../../../services/LocationServices";
import { Constants } from "expo";

const { width, height } = Dimensions.get('window');
class SearchLocation extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const textSearch = navigation.getParam('textSearch', 'NO-ID');
    this.state = {
      textSearch: textSearch,
      loading: true,
      listLocations: [],
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
      const result = await LocationServices.searchLocation({
        textSearch: this.state.textSearch
      });
      this.setState({ listLocations: result, loading: false });
    } catch (error) {
      throw error;
    }
  };

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
    this._requestGetLocation();
  }
  
  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _onSelect = () => {
    
  }

  render() {
    console.disableYellowBox = true; 
    const { loading, listLocations } = this.state;
    if (loading) {
      return (
        <View style={styles.background}>
          <Spinner color="#615c70" />
        </View>
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
                    value={this.state.textSearch}
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
          {listLocations.length === 0 ? 
          <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
            <Text> Không có kết quả nào </Text>
          </View> : 
          <LocationList data={this.state.listLocations} navigation={this.props.navigation}/> }
        </Screen>
        <FilterModal onSelect={this._onSelect} ref={ref => (this.filterModal = ref)} />       
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
  },
  emptyResult: {
    alignItems: "center",
    justifyContent: "center"
  }
};

export default SearchLocation;