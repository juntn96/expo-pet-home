import React from "react";
import { View, FlatList, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Item from './item'
const data = [
  1,
  2,
  3,
  4,
  5
];

export default class AnimatedHeader extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <Item item={item} parentView={this.view} />
    );
  };

  componentDidMount() {
    console.log(Dimensions.get('window'))
    this.view.measure((fx, fy, width, height, px, py) => {
      console.log("Component width is: " + width);
      console.log("Component height is: " + height);
      console.log("X offset to frame: " + fx);
      console.log("Y offset to frame: " + fy);
      console.log("X offset to page: " + px);
      console.log("Y offset to page: " + py);
    });
  }

  render() {
    return (
      <View style={styles.container} ref={ref => (this.view = ref)}>
        
        <FlatList
          horizontal={true}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={({ item }) => item}
        />
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            position: 'absolute',
            transform: [
              {
                translateX: 50
              },
              {
                translateY: 50
              }
            ]
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  nonsenseItem: {
    backgroundColor: "red",
    margin: 8,
  },
  itemText: {
    backgroundColor: "blue",
    fontSize: 20,
    padding: 20,
  },
  headerWrapper: {
    position: "absolute",
    backgroundColor: "red",
    height: 200,
    left: 0,
    right: 0,
  },
});
