import React from "react";
import { View, FlatList, Animated } from "react-native";
import { Container, List, ListItem, Button, Text } from "native-base";
import PostItem from "../CustomComponents/PostItem";
import { postData } from "../../utils/fakeData";
import AnimatedHeader from "./AnimatedHeader";
import PostOptionModal from "../CustomComponents/PostOptionModal";

const animatedValue = new Animated.Value(0);
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const BUTTON_HEIGHT = 45;
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _openModel = () => {
    this.optionModal.setModalVisible(true, [
      {
        name: "Sửa bài viết",
      },
      {
        name: "Xóa bài viết",
      },
    ]);
  };

  render() {
    const { userData } = this.props;
    return (
      <Container>
        <PostOptionModal ref={ref => (this.optionModal = ref)} />
        <AnimatedHeader
          userData={userData}
          animatedValue={animatedValue}
          navigation={this.props.navigation}
        />
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

export default ProfileScreen;
