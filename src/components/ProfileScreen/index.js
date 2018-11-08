import React from "react";
import { View, FlatList, Animated } from "react-native";
import { Container } from "native-base";
import PostItem from "../CustomComponents/PostItem";
import { postData } from "../../utils/fakeData";
import { connect } from "react-redux";
import AnimatedHeader from "./AnimatedHeader";

const animatedValue = new Animated.Value(0);
const AnimatedList = Animated.createAnimatedComponent(FlatList);
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    // animatedValue.addListener(({ value }) => {
    //   console.log(value);
    // });

    // animatedValue.interpolate({
    //   extrapolate: 'identity'
    // })
  }

  render() {
    const { userData } = this.props.data;
    return (
      <Container>
        <AnimatedHeader userData={userData} animatedValue={animatedValue} />
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
