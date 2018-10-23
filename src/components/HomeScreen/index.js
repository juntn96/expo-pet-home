import React, { Component } from "react";
import { View, Dimensions, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  FooterTab,
  Footer,
  Badge
} from "native-base";
import TagList from "../TagList";
import CustomHeader from "../CustomComponents/CustomHeader";
import AddPostModal from '../../components/CustomComponents/AddPostModal';

export default class extends Component {
  render() {
    return (
      <Container>
        <CustomHeader
          title="Pet Home"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
          buttonRight="ios-notifications-outline"
          badgeNumberRight="9"
        />
        <View>
          <TagList navigation={this.props.navigation} />
        </View>
        <Content>
          <View style={{ margin: 10 }}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require("../../assets/images/bg1.png")} />
                  <Body>
                    <Text>NativeBase</Text>
                    <Text note style={{ fontSize: 12 }}>
                      April 15, 2016
                    </Text>
                  </Body>
                </Left>
                <Right style={{ alignSelf: "flex-start" }}>
                  <Icon name="ios-more" style={{ color: "#000" }} />
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={require("../../assets/images/bg3.png")}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{ color: "#FF8EBC" }}>
                    <Icon name="ios-arrow-up" style={{ color: "#FF8EBC" }} />
                    <Text>10k</Text>
                  </Button>
                  <Button transparent textStyle={{ color: "#00E7C3" }}>
                    <Icon
                      name="ios-chatbubbles-outline"
                      style={{ color: "#00E7C3" }}
                    />
                    <Text>392</Text>
                  </Button>
                </Left>

                <Right>
                  <Button transparent textStyle={{ color: "#EC466A" }}>
                    <Icon name="ios-arrow-down" style={{ color: "#EC466A" }} />
                    <Text>10</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="ios-home-outline" />
            </Button>
            <AddPostModal/>
            <Button vertical>
              <Icon name="ios-search-outline" />
            </Button>
          </FooterTab>
        </Footer>
        
      </Container>
    );
  }
}
