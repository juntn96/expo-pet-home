import React, { Component } from "react";
import {
  View,
  Modal,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
import {
  Header,
  Icon,
  Button,
  Container,
  Content,
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from "native-base";
import { locationData, markerType } from "../../../../utils/fakeData";
import FilterModal from "../FilterModal";

class SimpleSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      listHeight: 0,
      animatedTrans: new Animated.ValueXY({
        x: 0,
        y: Dimensions.get("window").height + 200,
      }),
    };
  }

  setModalVisible = visible => {
    if (visible) {
      this.setState(
        {
          modalVisible: visible,
        },
        () => {
          Animated.spring(this.state.animatedTrans, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      );
    } else {
      Animated.timing(this.state.animatedTrans, {
        toValue: { x: 0, y: 0 - Dimensions.get("window").height },
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          modalVisible: visible,
        });
      });
    }
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Container>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#B5B5B5",
                borderRadius: 5,
              }}
            >
              <Button
                transparent
                iconRight
                onPress={() => this.setModalVisible(false)}
              >
                <Icon
                  name="ios-arrow-back-outline"
                  style={{ color: "#EC466A" }}
                />
              </Button>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Tìm kiếm"
                  underlineColorAndroid="transparent"
                  numberOfLines={1}
                  style={{
                    borderBottomWidth: 0,
                  }}
                />
              </View>
              <Button
                transparent
                iconLeft
                onPress={() => this.filterModal.setVisibleModal(true)}
              >
                <Icon name="md-options" style={{ color: "#EC466A" }} />
              </Button>
            </View>
          </Header>
          <Content>
            <Animated.View
              style={{
                paddingBottom: 8,
                transform: [
                  ...this.state.animatedTrans.getTranslateTransform(),
                ],
              }}
            >
              <FlatList
                data={locationData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <ListItem thumbnail>
                      <Left>
                        <Thumbnail
                          small
                          square
                          source={markerType[item.type].thumbnail}
                        />
                      </Left>
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>Hòa Lạc, Thạch Thất, Hà Nội</Text>
                      </Body>
                    </ListItem>
                  );
                }}
              />
            </Animated.View>
          </Content>
        </Container>
        <FilterModal ref={ref => this.filterModal = ref} />
      </Modal>
    );
  }
}

export default SimpleSearchModal;
