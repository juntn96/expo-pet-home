import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MapView } from 'expo';

const data = [1, 2 ,3 ,4 ,5]

export default class extends Component {

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#c5c5c590',
          marginLeft: 10,
          marginRight: 20,
          padding: 8,
          borderRadius: 8
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 4
          }}
        >Day la ten location</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#00cc99', marginRight: 4}} />
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#00cc99', marginRight: 4}} />
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#00cc99', marginRight: 4}} />
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#00cc99', marginRight: 4}} />
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: '#615c70', marginRight: 10}} />
          <Text style={{fontSize: 12}} >4.5/5  -  Cách bạn 1.2Km</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <FlatList
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0
          }}
          data={data}
          renderItem={this._renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
