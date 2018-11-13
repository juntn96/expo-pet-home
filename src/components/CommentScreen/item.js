import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
} from "react-native";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.parentView)
  }

  render() {
    let customStyle = {};
    if (this.props.item === 5) {
      customStyle = {
        transform: [
          {
            translateX: 10,
          },
          {
            translateY: 10,
          },
        ],
      };
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.view.measureInWindow((x, y, containerWidth, containerHeight) => {
            console.log(x, y, containerWidth, containerHeight);
            console.log(this.props.item);
          });
        }}
        style={[styles.nonsenseItem, { ...customStyle }]}
        ref={ref => (this.view = ref)}
        onLayout={event => {
          setTimeout(() => {
            this.view.measureInWindow(
              (x, y, containerWidth, containerHeight) => {
                console.log(x, y, containerWidth, containerHeight);
                console.log(this.props.item);
                console.log("+++++");
              }
            );
          }, 0);
        }}
      >
        <Text ref={ref => (this.text = ref)} style={styles.itemText}>
          {this.props.item}
        </Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    width: 100,
    height: 40,
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
