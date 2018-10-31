import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";

import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";

import { connect } from 'react-redux'

class ProfileScreen extends React.Component {
  render() {
    const {userData} = this.props.data
    console.log(userData)
    return (
      <Container>
        <Content>
          <View
            style={{
              height: 300,
            }}
          >
            <View
              style={{
                height: 200,
                backgroundColor: "#000",
              }}
            >
              <Image
                source={require('../../assets/images/bg2.png')}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </View>
            <View 
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                backgroundColor: '#FFF',
                position: 'absolute',
                top: 140,
                alignSelf: 'center',
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: '#FFF'
              }}
            >
              <Image 
                source={{uri: userData.largePicture.data.url}}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 28,
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#00000090'
              }}
            >{userData.name}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userData
  }
}

export default connect(mapStateToProps)(ProfileScreen);