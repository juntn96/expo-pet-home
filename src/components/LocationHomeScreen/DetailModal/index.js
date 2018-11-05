import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import { Button, Icon, List, TabHeading } from "native-base";
import TagList from "../../CustomComponents/TagList";
import StaticItem from "./StaticItem";
import AnimateItem from "./AnimateItem";

const data = [1, 2, 3, 4, 5];

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showStaticItem: false,
      canRenderAnimate: false,
      animateValue: new Animated.Value(0),
      item: null,
    };
  }

  showModal = (curPos, item) => {
    this.setState({ item }, () => {
      this.setState(
        {
          modalVisible: true,
        },
        () => {
          this.fromPos = curPos;
          Animated.timing(this.state.animateValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            this.tempView.measureInWindow((tempX, tempY) => {
              this.toPos = { x: tempX, y: tempY };
              this.setState({
                canRenderAnimate: true,
              });
            });
          }, 10);
        }
      );
    });
  };

  hideModal = curPos => {
    this.setState(
      {
        canRenderAnimate: true,
        showStaticItem: false,
      },
      () => {
        setTimeout(() => {
          this.tempView.measureInWindow((x, y) => {
            const fromPos = { x: x, y: y };
            this.animateItem.hide(fromPos, curPos, this._onAnimateHideDone);
          });
        }, 0);
      }
    );
  };

  _onAnimateHideDone = () => {
    this.setState({
      modalVisible: false,
      showStaticItem: false,
      canRenderAnimate: false,
      item: null,
    });
  };

  _showStaticItem = () => {
    this.setState({
      showStaticItem: true,
    });
  };

  _renderItem = (imageItem) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").height / 3,
          height: Dimensions.get("window").height / 3,
          backgroundColor: "#000",
          borderWidth: 2,
          borderColor: '#FFF'
        }}
      >
        <Image source={{uri: imageItem.url}} style={{width: '100%', height: '100%'}} />
      </View>
    );
  };

  _renderAnimateItem = () => {
    if (this.state.canRenderAnimate) {
      return (
        <AnimateItem
          ref={ref => (this.animateItem = ref)}
          fromPos={this.fromPos}
          toPos={this.toPos}
          onAnimationDone={this._showStaticItem}
          item={this.state.item}
        />
      );
    }
    return null;
  };

  render() {
    let animOpacity = this.state.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const { item } = this.state;

    console.log("item > ", item);

    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="none"
      >
        {this.state.item ? (
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              paddingTop: 20,
              opacity: animOpacity,
            }}
          >
            <View>
              <List
                dataArray={item.images}
                horizontal
                renderRow={(item) => this._renderItem(item)}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View ref={ref => (this.tempView = ref)}>
              {this.state.showStaticItem ? <StaticItem item={item} /> : null}
            </View>
            <Button
              transparent
              onPress={() => {
                this.props.onHide(item.id);
              }}
              style={{
                position: "absolute",
                top: 25,
              }}
            >
              <Icon name="md-close" style={{ color: "#EC466A" }} />
            </Button>
            {this._renderAnimateItem()}
          </Animated.View>
        ) : null}
      </Modal>
    );
  }
}
