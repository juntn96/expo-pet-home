import React from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class AnimatedList extends React.Component {
  state = {
    animatedValue: new Animated.Value(0),
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.nonsenseItem} >
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <AnimatedFlatList
        contentContainerStyle={{ marginTop: 200 }}
        scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
        onScroll={this.props.onScroll}
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item, i) => i}
      />
    );
  }
}

export default class AnimatedHeader extends React.Component {
  state = {
    animatedValue: new Animated.Value(0),
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.nonsenseItem}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  render() {
    let translateY = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: [0, -180],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <AnimatedList
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.animatedValue } },
              },
            ],
            { useNativeDriver: true } // <-- Add this
          )}
        />
        <Animated.View
          style={[styles.headerWrapper, { transform: [{ translateY }] }]}>
          <Text>testo a caso da ridurre</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  nonsenseItem: {
    backgroundColor: 'red',
    margin: 8,
  },
  itemText: {
    backgroundColor: 'blue',
    fontSize: 20,
    padding: 20,
  },
  headerWrapper: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 200,
    left: 0,
    right: 0,
  },
})