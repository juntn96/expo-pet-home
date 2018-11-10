import React from "react";
import { View, FlatList, Animated } from "react-native";
import { Container, List, ListItem, Button, Text } from "native-base";
import PostItem from "../CustomComponents/PostItem";
import { postData } from "../../utils/fakeData";
import { connect } from "react-redux";
import AnimatedHeader from "./AnimatedHeader";
import Modal from 'react-native-modalbox'
const animatedValue = new Animated.Value(0);
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const BUTTON_HEIGHT = 45
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _openModel = () => {
    this.optionModal.open();
  };

  render() {
    const { userData } = this.props.data;
    return (
      <Container>
        <Modal
          ref={ref => {
            this.optionModal = ref;
          }}
          position={"bottom"}
          swipeToClose={true}
          style={{
            height: BUTTON_HEIGHT * 2,
            backgroundColor: 'transparent'
          }}
        >
          <List>
            <Button full info >
              <Text>Edit</Text>
            </Button>
            <Button full danger >
              <Text>Delete</Text>
            </Button>
          </List>
        </Modal>
        <AnimatedHeader userData={userData} animatedValue={animatedValue} navigation={this.props.navigation} />
        <AnimatedList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: animatedValue,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={postData}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <PostItem
                  postData={item}
                  optionPress={this._openModel}
                  navigation={this.props.navigation}
                />
              </View>
            );
          }}
          keyExtractor={item => item.postId + ""}
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: 220,
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userData,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
