import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, FlatList, ScrollView } from 'react-native';
import { Container, Header, Spinner, Icon, Button, Text , Left} from 'native-base';
import { Divider, Card, DropDownMenu, Examples, Screen, Image, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui';
import LocationServices from "../../../../services/LocationServices";
import { Constants } from "expo";

const { width, height } = Dimensions.get('window');

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        typeIdArray: [{ typeId: "5bedabb2b3c51a06927c35bb"}]
      });
      this.setState({ listLocations: result });
      if(this.state.listLocations.length > 0) {
        this.setState({ loading: false });
      }
    } catch (error) {
      throw error;
    }
  };

  _onBack = () => {
    this.props.navigation.goBack(null);
  }
  
  render() {
    const { loading, listLocations } = this.state;
    if (loading) {
      return (
        <View style={styles.background}>
          <Spinner color="#615c70" />
        </View>
      );
    }
    if (listLocations.length === 0) {
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
          <View style={styles.background}>
            <Text>Không có bài viết</Text>
          </View>
        </Container>      
      );
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
        </Header>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});